import { NextResponse } from "next/server";
import openai from "../../openai";
import axios from "axios";
import { load } from "cheerio";

async function getRandomMarketingLesson() {
  try {
    const response = await axios.get("https://marketingexamples.com/");
    const $ = load(response.data);

    const lessons = $("a.card")
      .map((_, card) => {
        const $card: any = $(card);
        return {
          title: $card.find("h4").text().trim(),
          url: new URL($card.attr("href"), "https://marketingexamples.com")
            .href,
          category: $card.find(".card__bottom-tag").text().trim(),
          readTime: $card.find(".pCard__bottom-link-text").text().trim(),
        };
      })
      .get();

    if (lessons.length === 0) {
      throw new Error("No lessons found");
    }

    const randomLesson: any = lessons[Math.floor(Math.random() * lessons.length)];

    // Fetch the content of the selected lesson
    const lessonResponse = await axios.get(randomLesson.url);
    const $lesson = load(lessonResponse.data);
    randomLesson.content =
      $lesson("article").text().trim() || "No content found";

    return randomLesson;
  } catch (error) {
    console.error("Error in getRandomMarketingLesson:", error);
    throw error;
  }
}

export async function POST() {
  try {
    const lesson = await getRandomMarketingLesson();

    const prompt = `Read this article: ${lesson.url}.

    Then create a specific exercise that a user can complete as a compliment to the article so they can apply the lessons to a real-world scenario.

    Please make sure all the text is formatted as simply as possible and is a pleasure to read.

    Ensure the exercise:
    - Do not summarize the article, just use it as context. Get straight to the exercise.
    - Is tightly focused on the specific strategy or technique from the article
    - Provides clear, actionable steps that directly apply the lesson's insights
    - Challenges users to think creatively while working within defined constraints
    - Assume the user doesn't have a business or want to start one so don't ask them to do research or anything before the exercise. Provide any necessary context in the exercise.
    - Make the exercise super short and all the text explaining the exercise should be no more than 2 paragraphs.
    - Make the exercise specific, challenging, and directly applicable to real-world scenarios.
    - Make the formatting markdown and have it look nice with h1, h2, and h3 headings ONLY and proper spacing but NO separators and NO bold or italic text anywhere.
    - Always provide the user with an example of what you're asking them to do so they can clearly understand the task.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "chatgpt-4o-latest",
    });

    const content = completion.choices[0].message.content;

    return NextResponse.json({
      content: encodeURIComponent(content as string),
      lesson: lesson.title,
      lessonUrl: lesson.url,
      category: lesson.category,
      readTime: lesson.readTime,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred during your request." },
      { status: 500 }
    );
  }
}

import axios from "axios";
import { load } from "cheerio";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { NextResponse } from "next/server";

// Force this route to be dynamic (not pre-rendered at build time)
export const dynamic = "force-dynamic";

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

    const randomLesson: any =
      lessons[Math.floor(Math.random() * lessons.length)];

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

export async function GET() {
  try {
    const lesson = await getRandomMarketingLesson();
    console.log("got the lesson");

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

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { text } = await generateText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      prompt: prompt,
    });

    return NextResponse.json({
      message: "Created a new worksheet",
      data: {
        content: encodeURIComponent(text),
        lesson: lesson.title,
        lessonUrl: lesson.url,
        category: lesson.category,
        readTime: lesson.readTime,
      },
    });
  } catch (error) {
    console.log("an error happened so this is the catch");
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate daily dollar worksheet",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

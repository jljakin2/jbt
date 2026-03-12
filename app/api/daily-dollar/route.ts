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

    const prompt = `Here is the content of a marketing article from ${lesson.url}:

    ${lesson.content}

    Your job is to create a daily marketing practice exercise for an aspiring entrepreneur. The exercise should let them practice the core technique from the article by producing a real marketing output for a fictional business scenario that you invent.

    Rules:
    - Invent a specific fictional business (e.g. "a candle subscription box called Wax & Wonder" or "a one-person freelance logo design studio called Mark Made"). Make it feel concrete and real.
    - The exercise output should be an actual marketing deliverable — something they write, draft, or create (e.g. a subject line, a landing page headline, an about page, a cold email, an ad, a product description). Never ask them to do research, brainstorm, or reflect.
    - Do not summarize the article. Jump straight into the scenario and the task.
    - Keep the setup to 2-3 sentences max. Then give the task.
    - Provide one short example of what a completed output looks like for the scenario so the user knows exactly what to produce.
    - The full exercise text should be no more than 2 paragraphs plus the example.
    - Format as markdown using h1, h2, and h3 headings only. No bold, no italic, no separators.`;

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
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

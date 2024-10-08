import { NextRequest, NextResponse } from "next/server";
import openai from "../../../api/openai";
import puppeteer from "puppeteer";

async function getRandomMarketingLesson() {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    console.log("Navigating to Marketing Examples...");
    await page.goto("https://marketingexamples.com/", {
      waitUntil: "networkidle0",
    });

    console.log("Extracting lessons...");
    const lessons = await page.evaluate(() => {
      const cards = document.querySelectorAll("a.card");
      console.log("Number of cards found:", cards.length);
      return Array.from(cards).map((card) => {
        const title =
          card.querySelector("h4")?.textContent?.trim() || "No title found";
        const url = card.href;
        const category =
          card.querySelector(".card__bottom-tag")?.textContent?.trim() ||
          "No category found";
        const readTime =
          card.querySelector(".pCard__bottom-link-text")?.textContent?.trim() ||
          "No read time found";
        console.log("Extracted lesson:", { title, url, category, readTime });
        return { title, url, category, readTime };
      });
    });

    console.log("Extracted lessons:", lessons);

    if (lessons.length === 0) {
      throw new Error("No lessons found");
    }

    const randomLesson = lessons[Math.floor(Math.random() * lessons.length)];
    console.log("Selected random lesson:", randomLesson);

    // Fetch the content of the selected lesson
    await page.goto(randomLesson.url, { waitUntil: "networkidle0" });
    const articleContent = await page.evaluate(() => {
      const articleElement = document.querySelector("article");
      return articleElement ? articleElement.innerText : "No content found";
    });

    randomLesson.content = articleContent;

    return randomLesson;
  } catch (error) {
    console.error("Error in getRandomMarketingLesson:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

export async function POST(req: NextRequest) {
  const { topic } = await req.json();

  try {
    console.log("Fetching random marketing lesson...");
    const lesson = await getRandomMarketingLesson();
    console.log("Fetched lesson:", lesson.title);

    const prompt = `As a marketing expert, create a bite-sized, 15-minute exercise for ${topic} based on this lesson: "${lesson.title}". The exercise should be quick, actionable, and improve marketing skills.

    Structure the response in HTML as follows:
    1. <h1>: A catchy, concise title (max 10 words)
    2. <p>: A 2-3 sentence introduction explaining the key takeaway
    3. <h2>15-Minute Challenge:</h2>
    4. <ol>: 3 quick, specific steps for the exercise, each doable in 5 minutes
    5. <blockquote>: A short, motivational quote (max 15 words)

    Ensure the exercise:
    - Is directly related to ${topic} and the lesson title
    - Can be completed in 15 minutes
    - Provides immediate, actionable value
    - Is specific and practical, not theoretical
    - Focuses on a single, clear marketing skill or concept

    Keep the total content brief, aiming for about 200 words.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const content = completion.choices[0].message.content;

    console.log("Generated content:", content);

    return NextResponse.json({
      content: encodeURIComponent(content),
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

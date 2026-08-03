import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";

import type { LegalDocument } from "./types";

function sectionId(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8 lg:pt-36">
        <p className="text-[0.65rem] tracking-[0.32em] text-primary uppercase">
          Legal
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {document.title}
        </h1>
        <p className="mt-3 text-xs text-muted-foreground">
          Version {document.version} · Effective {document.effectiveDate}
        </p>
        <p className="mt-6 text-sm leading-7 text-muted-foreground">
          {document.intro}
        </p>

        <div className="mt-12 space-y-10">
          {document.sections.map((section) => (
            <section
              key={section.heading}
              id={sectionId(section.heading)}
              className="scroll-mt-28 space-y-3"
            >
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

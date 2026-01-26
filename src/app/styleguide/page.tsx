"use client";

import Image from "next/image";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { PageTransition } from "@/components/layout/PageTransition";

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTransition className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <nav className="mb-12 pb-6 border-b border-border">
          <div className="flex gap-6">
            <a href="#colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Colors
            </a>
            <a href="#typography" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Typography
            </a>
            <a href="#elements" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Elements
            </a>
          </div>
        </nav>

        {/* Theme Preview Section */}
        <section className="mb-16">
        <div className="mb-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Brand
            </h2>
            <p className="text-base text-muted-foreground">
              Logos and such.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {/* Light Theme Preview */}
            <div className="bg-[#F5F0E6] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image
                src="/images/logos/logobug.svg"
                alt="Applaudit Logo Mark"
                width={80}
                height={80}
                priority
              />
            </div>

            {/* Dark Theme Preview */}
            <div className="bg-[#2D2438] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image
                src="/images/logos/logobug_dark.svg"
                alt="Applaudit Logo Mark"
                width={80}
                height={80}
                priority
              />
            </div>
          </div>
        </section>

        {/* Logo Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 gap-6">
            {/* Dark Theme Preview */}
            <div className="bg-[#2D2438] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image
                src="/images/logos/logo_dark.svg"
                alt="Applaudit Logo Mark"
                width={280}
                height={80}
                priority
              />
            </div>  
            {/* Light Theme Preview */}
            <div className="bg-[#F5F0E6] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image
                src="/images/logos/logo.svg"
                alt="Applaudit Logo Mark"
                width={280}
                height={80}
                priority
              />
            </div>     
          </div>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-16 scroll-mt-8">
          <div className="mb-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Colors
            </h2>
            <p className="text-base text-muted-foreground">
              Design system color palette with hexcodes.
            </p>
          </div>

          <div className="border-t border-border pt-8 space-y-8">
            {/* Light Theme Colors */}
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Light Theme
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#F5F0E6] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Background</p>
                    <p className="text-xs text-muted-foreground font-mono">#F5F0E6</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#2D2438] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">#2D2438</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#F26B6B] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Primary</p>
                    <p className="text-xs text-muted-foreground font-mono">#F26B6B</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#2D2438] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Secondary</p>
                    <p className="text-xs text-muted-foreground font-mono">#2D2438</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#E8E3DA] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Muted</p>
                    <p className="text-xs text-muted-foreground font-mono">#E8E3DA</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#6B5F6F] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Muted Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">#6B5F6F</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#E8E3DA] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Accent</p>
                    <p className="text-xs text-muted-foreground font-mono">#E8E3DA</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#D4CFC5] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Border</p>
                    <p className="text-xs text-muted-foreground font-mono">#D4CFC5</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#FFFFFF] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Card</p>
                    <p className="text-xs text-muted-foreground font-mono">#FFFFFF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Theme Colors */}
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Dark Theme
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#2D2438] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Background</p>
                    <p className="text-xs text-muted-foreground font-mono">#2D2438</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#F5F0E6] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">#F5F0E6</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#F26B6B] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Primary</p>
                    <p className="text-xs text-muted-foreground font-mono">#F26B6B</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#3D3348] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Secondary</p>
                    <p className="text-xs text-muted-foreground font-mono">#3D3348</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#3D3348] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Muted</p>
                    <p className="text-xs text-muted-foreground font-mono">#3D3348</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#A89CAB] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Muted Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">#A89CAB</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#3D3348] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Accent</p>
                    <p className="text-xs text-muted-foreground font-mono">#3D3348</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[rgba(245,240,230,0.1)] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Border</p>
                    <p className="text-xs text-muted-foreground font-mono">rgba(245,240,230,0.1)</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#1E1A24] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Card</p>
                    <p className="text-xs text-muted-foreground font-mono">#1E1A24</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section id="typography" className="mb-16 scroll-mt-8">
          <div className="mb-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Typography
            </h2>
            <p className="text-base text-muted-foreground">
              Design system typography examples and variations.
            </p>
          </div>

          <div className="border-t border-border pt-8 space-y-12">
            {/* Headings */}
            <div className="space-y-4">
              <h1 className="font-display text-5xl font-bold text-foreground">
                Heading 1
              </h1>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Heading 2
              </h2>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Heading 3
              </h3>
              <h4 className="font-display text-xl font-bold text-foreground">
                Heading 4
              </h4>
            </div>

            {/* Monospaced */}
            <div className="space-y-2">
              <p className="font-mono text-base text-foreground">
                Monospaced text example
              </p>
              <p className="font-mono text-base text-muted-foreground">
                Monospaced muted text example
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph regular
                </p>
                <p className="text-base text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph medium
                </p>
                <p className="text-base font-medium text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph bold
                </p>
                <p className="text-base font-bold text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph small
                </p>
                <p className="text-sm text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph small medium
                </p>
                <p className="text-sm font-medium text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph mini bold
                </p>
                <p className="text-xs font-bold text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph mini medium
                </p>
                <p className="text-xs font-medium text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  paragraph mini
                </p>
                <p className="text-xs text-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Elements Section */}
        <section id="elements" className="scroll-mt-8">
          <div className="mb-6">
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Elements
            </h2>
            <p className="text-base text-muted-foreground">
              Design system UI elements and components.
            </p>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-base text-muted-foreground">
              Elements section coming soon.
            </p>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}

"use client";

import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import { ThemedImage } from "@/components/shared/ThemedImage";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card";

export default function StyleguidePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageTransition className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <nav className="mb-12 pb-6 border-b border-border">
          <div className="flex flex-wrap gap-6">
            <a href="#colors" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Colors
            </a>
            <a href="#typography" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Typography
            </a>
            <a href="#elements" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Elements
            </a>
            <a href="/avatar?preview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Avatar (preview)
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
            <div className="bg-[#FEF6DA] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image
                src="/images/logos/logobug.svg"
                alt="Applaudit Logo Mark"
                width={80}
                height={80}
                priority
              />
            </div>

            {/* Dark Theme Preview */}
            <div className="bg-[#2B1927] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
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
            <div className="bg-[#2B1927] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
              <Image
                src="/images/logos/logo_dark.svg"
                alt="Applaudit Logo Mark"
                width={280}
                height={80}
                priority
              />
            </div>  
            {/* Light Theme Preview */}
            <div className="bg-[#FEF6DA] rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
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
                  <div className="w-full h-20 bg-[#FEF6DA] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Background</p>
                    <p className="text-xs text-muted-foreground font-mono">#FEF6DA</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#2B1927] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">#2B1927</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#FF5E6C] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Primary</p>
                    <p className="text-xs text-muted-foreground font-mono">#FF5E6C</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#2B1927] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Secondary</p>
                    <p className="text-xs text-muted-foreground font-mono">#2B1927</p>
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
                  <div className="w-full h-20 bg-[#2B1927] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Background</p>
                    <p className="text-xs text-muted-foreground font-mono">#2B1927</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#FEF6DA] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Foreground</p>
                    <p className="text-xs text-muted-foreground font-mono">#FEF6DA</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-20 bg-[#FF5E6C] rounded border border-border"></div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Primary</p>
                    <p className="text-xs text-muted-foreground font-mono">#FF5E6C</p>
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

          <div className="border-t border-border pt-8 space-y-12">
            {/* Buttons */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Buttons
                </h3>
                
                {/* Button Variants */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Variants</p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default" className="rounded-full">Default</Button>
                      <Button variant="secondary" className="rounded-full">Secondary</Button>
                      <Button variant="outline" className="rounded-full">Outline</Button>
                      <Button variant="ghost" className="rounded-full">Ghost</Button>
                      <Button variant="destructive" className="rounded-full">Destructive</Button>
                      <Button variant="link" className="rounded-full">Link</Button>
                    </div>
                  </div>

                  {/* Button Sizes */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Sizes</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="xs" className="rounded-full">Extra Small</Button>
                      <Button size="sm" className="rounded-full">Small</Button>
                      <Button size="lg" className="rounded-full">Default</Button>
                      <Button size="lg" className="rounded-full">Large</Button>
                    </div>
                  </div>

                  {/* Button States */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">States</p>
                    <div className="flex flex-wrap gap-3">
                      <Button className="rounded-full">Normal</Button>
                      <Button disabled className="rounded-full">Disabled</Button>
                    </div>
                  </div>

                  {/* Button with Icon */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">With Icon</p>
                    <div className="flex flex-wrap gap-3">
                      <Button className="rounded-full">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" className="rounded-full">
                        <Plus className="h-4 w-4" />
                        Add Item
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-4">
                  Cards
                </h3>
                
                {/* Card Variants */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Variants</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card variant="default">
                        <CardHeader>
                          <CardTitle>Default Card</CardTitle>
                          <CardDescription>This is a default card variant</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground">
                            Card content goes here. This demonstrates the default styling.
                          </p>
                        </CardContent>
                      </Card>

                      <Card variant="light">
                        <CardHeader>
                          <CardTitle>Light Card</CardTitle>
                          <CardDescription>This is a light card variant</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground">
                            Card content goes here. This demonstrates the light styling.
                          </p>
                        </CardContent>
                      </Card>

                      <Card variant="dark">
                        <CardHeader>
                          <CardTitle>Dark Card</CardTitle>
                          <CardDescription>This is a dark card variant</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-foreground">
                            Card content goes here. This demonstrates the dark styling.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Card with Footer */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">With Footer</p>
                    <Card>
                      <CardHeader>
                        <CardTitle>Card with Footer</CardTitle>
                        <CardDescription>This card includes a footer section</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground">
                          Card content goes here. The footer can contain actions or additional information.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm" className="rounded-full">Cancel</Button>
                        <Button size="sm" className="rounded-full">Save</Button>
                      </CardFooter>
                    </Card>
                  </div>

                  {/* Card with Action */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-3">With Action</p>
                    <Card>
                      <CardHeader>
                        <CardTitle>Card with Action</CardTitle>
                        <CardDescription>This card includes an action button in the header</CardDescription>
                        <CardAction>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </CardAction>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-foreground">
                          Card content goes here. The action button appears in the top right of the header.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageTransition>
    </div>
  );
}

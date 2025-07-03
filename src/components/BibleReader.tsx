
import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BibleReaderProps {
  translation: string;
  book: string;
  chapter: number;
  onSearch: (query: string) => void;
}

const BibleReader = ({ translation, book, chapter, onSearch }: BibleReaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);

  // Sample verses - in a real app, this would come from an API
  const sampleVerses = [
    { verse: 1, text: "In the beginning God created the heavens and the earth." },
    { verse: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters." },
    { verse: 3, text: "And God said, 'Let there be light,' and there was light." },
    { verse: 4, text: "God saw that the light was good, and he separated the light from the darkness." },
    { verse: 5, text: "God called the light 'day,' and the darkness he called 'night.' And there was evening, and there was morning—the first day." },
    { verse: 6, text: "And God said, 'Let there be a vault between the waters to separate water from water.'" },
    { verse: 7, text: "So God made the vault and separated the water under the vault from the water above it. And it was so." },
    { verse: 8, text: "God called the vault 'sky.' And there was evening, and there was morning—the second day." },
    { verse: 9, text: "And God said, 'Let the water under the sky be gathered to one place, and let dry ground appear.' And it was so." },
    { verse: 10, text: "God called the dry ground 'land,' and the gathered waters he called 'seas.' And God saw that it was good." },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(selectedVerse === verseNumber ? null : verseNumber);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search verses, chapters, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-effect border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="bg-bible-primary hover:bg-bible-secondary">
              Search
            </Button>
          </form>
        </Card>
      </Card>

      {/* Chapter Header */}
      <Card className="glass-effect border-white/10">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                {book} {chapter}
              </CardTitle>
              <p className="text-gray-400 mt-1">{translation}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                disabled={chapter <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Bible Text */}
      <Card className="glass-effect border-white/10">
        <CardContent className="p-8">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {sampleVerses.map((verse) => (
                <div
                  key={verse.verse}
                  className={`group cursor-pointer transition-all duration-200 ${
                    selectedVerse === verse.verse
                      ? 'bg-bible-primary/10 border-l-4 border-bible-primary pl-4 py-2 rounded-r-lg'
                      : 'hover:bg-white/5 pl-4 py-2 rounded-lg'
                  }`}
                  onClick={() => handleVerseClick(verse.verse)}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-bible-accent font-bold text-sm mt-1 min-w-[2rem]">
                      {verse.verse}
                    </span>
                    <p className="verse-text text-gray-100 leading-relaxed">
                      {verse.text}
                    </p>
                  </div>
                  
                  {selectedVerse === verse.verse && (
                    <div className="mt-3 flex items-center gap-2 ml-10 animate-fade-in">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-bible-accent hover:text-bible-primary"
                      >
                        <Bookmark className="w-3 h-3 mr-1" />
                        Bookmark
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-bible-accent hover:text-bible-primary"
                      >
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-bible-accent hover:text-bible-primary"
                      >
                        Notes
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default BibleReader;


import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchPanelProps {
  searchQuery: string;
  translation: string;
}

const SearchPanel = ({ searchQuery, translation }: SearchPanelProps) => {
  const [query, setQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample search results
  const sampleResults = [
    {
      id: 1,
      book: 'Genesis',
      chapter: 1,
      verse: 1,
      text: 'In the beginning God created the heavens and the earth.',
      highlight: 'beginning'
    },
    {
      id: 2,
      book: 'John',
      chapter: 1,
      verse: 1,
      text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
      highlight: 'beginning'
    },
    {
      id: 3,
      book: 'Genesis',
      chapter: 1,
      verse: 3,
      text: 'And God said, "Let there be light," and there was light.',
      highlight: 'God'
    },
    {
      id: 4,
      book: 'Psalm',
      chapter: 23,
      verse: 1,
      text: 'The Lord is my shepherd; I shall not want.',
      highlight: 'Lord'
    },
  ];

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setSearchResults(sampleResults);
        setIsLoading(false);
      }, 500);
    }
  }, [query]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="search-highlight">
          {part}
        </span>
      ) : part
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would be implemented here
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Search className="w-5 h-5" />
            Search Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search the Bible..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 glass-effect border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="bg-bible-primary hover:bg-bible-secondary">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Search Results */}
      {query && (
        <Card className="glass-effect border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">
                Results for "{query}"
              </CardTitle>
              <Badge variant="secondary" className="bg-bible-primary/20 text-bible-accent">
                {searchResults.length} verses found
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bible-primary"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 rounded-lg glass-effect border border-white/5 hover:border-bible-primary/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-4 h-4 text-bible-accent mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-bible-accent font-semibold">
                            {result.book} {result.chapter}:{result.verse}
                          </span>
                          <Badge variant="outline" className="text-xs border-white/20 text-gray-400">
                            {translation}
                          </Badge>
                        </div>
                        <p className="text-gray-100 leading-relaxed">
                          {highlightText(result.text, result.highlight)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchPanel;


import { useState } from 'react';
import { Search, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WordLookup = () => {
  const [searchWord, setSearchWord] = useState('');
  const [wordData, setWordData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample word data
  const sampleWordData = {
    word: 'love',
    pronunciation: 'lʌv',
    definitions: [
      {
        partOfSpeech: 'noun',
        definition: 'An intense feeling of deep affection',
        example: 'God\'s love for humanity is unconditional'
      },
      {
        partOfSpeech: 'verb',
        definition: 'To feel deep affection or sexual attraction for someone',
        example: 'Love your neighbor as yourself'
      }
    ],
    hebrewGreek: [
      {
        language: 'Greek',
        word: 'ἀγάπη (agape)',
        definition: 'Unconditional love, divine love',
        strongsNumber: 'G26'
      },
      {
        language: 'Hebrew',
        word: 'אהבה (ahavah)',
        definition: 'Love, affection',
        strongsNumber: 'H160'
      }
    ],
    relatedVerses: [
      {
        reference: 'John 3:16',
        text: 'For God so loved the world that he gave his one and only Son...'
      },
      {
        reference: '1 Corinthians 13:4',
        text: 'Love is patient, love is kind. It does not envy, it does not boast...'
      }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchWord.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setWordData(sampleWordData);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Book className="w-5 h-5" />
            Word Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Enter a word to look up..."
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                className="pl-10 glass-effect border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="bg-bible-primary hover:bg-bible-secondary">
              Lookup
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Word Details */}
      {isLoading && (
        <Card className="glass-effect border-white/10">
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bible-primary"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {wordData && !isLoading && (
        <div className="space-y-6 animate-fade-in">
          {/* Word Header */}
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-3xl font-bold text-white capitalize">
                  {wordData.word}
                </h2>
                <span className="text-bible-accent text-lg">
                  /{wordData.pronunciation}/
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Definitions */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Definitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wordData.definitions.map((def: any, index: number) => (
                  <div key={index} className="border-l-4 border-bible-primary pl-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-bible-accent text-bible-accent">
                        {def.partOfSpeech}
                      </Badge>
                    </div>
                    <p className="text-gray-100 mb-2">{def.definition}</p>
                    <p className="text-gray-400 italic text-sm">
                      Example: "{def.example}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hebrew/Greek */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Original Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wordData.hebrewGreek.map((item: any, index: number) => (
                  <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-bible-primary text-white">
                        {item.language}
                      </Badge>
                      <span className="text-bible-accent text-sm">
                        {item.strongsNumber}
                      </span>
                    </div>
                    <h4 className="text-white font-semibold mb-1 text-lg">
                      {item.word}
                    </h4>
                    <p className="text-gray-300 text-sm">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Verses */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Related Verses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wordData.relatedVerses.map((verse: any, index: number) => (
                  <div key={index} className="p-4 rounded-lg glass-effect border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="border-bible-accent text-bible-accent">
                        {verse.reference}
                      </Badge>
                    </div>
                    <p className="text-gray-100 leading-relaxed">{verse.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default WordLookup;

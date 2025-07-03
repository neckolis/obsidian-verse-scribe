
import { useState } from 'react';
import { Search, Tag, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TopicSearch = () => {
  const [searchTopic, setSearchTopic] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const popularTopics = [
    { name: 'Faith', count: 543, color: 'bg-blue-500' },
    { name: 'Love', count: 486, color: 'bg-pink-500' },
    { name: 'Hope', count: 234, color: 'bg-green-500' },
    { name: 'Peace', count: 187, color: 'bg-indigo-500' },
    { name: 'Joy', count: 156, color: 'bg-yellow-500' },
    { name: 'Prayer', count: 298, color: 'bg-purple-500' },
    { name: 'Forgiveness', count: 145, color: 'bg-orange-500' },
    { name: 'Salvation', count: 203, color: 'bg-red-500' },
  ];

  const sampleTopicResults = {
    topic: 'Faith',
    description: 'Complete trust or confidence in someone or something; strong belief in God or in the doctrines of a religion.',
    verses: [
      {
        reference: 'Hebrews 11:1',
        text: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
        book: 'Hebrews',
        chapter: 11,
        verse: 1
      },
      {
        reference: 'Romans 10:17',
        text: 'Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.',
        book: 'Romans',
        chapter: 10,
        verse: 17
      },
      {
        reference: 'James 2:17',
        text: 'In the same way, faith by itself, if it is not accompanied by action, is dead.',
        book: 'James',
        chapter: 2,
        verse: 17
      },
      {
        reference: 'Mark 11:24',
        text: 'Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.',
        book: 'Mark',
        chapter: 11,
        verse: 24
      },
    ],
    relatedTopics: ['Trust', 'Belief', 'Hope', 'Prayer', 'Salvation']
  };

  const handleTopicSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTopic.trim()) {
      setSelectedTopic(searchTopic);
    }
  };

  const handleTopicClick = (topicName: string) => {
    setSelectedTopic(topicName);
    setSearchTopic(topicName);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Tag className="w-5 h-5" />
            Topic Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTopicSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search for a topic..."
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                className="pl-10 glass-effect border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
            <Button type="submit" className="bg-bible-primary hover:bg-bible-secondary">
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Popular Topics */}
      <Card className="glass-effect border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Popular Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {popularTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => handleTopicClick(topic.name)}
                className="p-3 rounded-lg glass-effect border border-white/10 hover:border-bible-primary/30 transition-all duration-200 group text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                  <span className="text-white font-medium">{topic.name}</span>
                </div>
                <span className="text-gray-400 text-sm">{topic.count} verses</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topic Results */}
      {selectedTopic && (
        <div className="space-y-6 animate-fade-in">
          {/* Topic Header */}
          <Card className="glass-effect border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-3xl font-bold text-white">
                  {sampleTopicResults.topic}
                </h2>
                <Badge className="bg-bible-primary text-white">
                  {sampleTopicResults.verses.length} verses
                </Badge>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {sampleTopicResults.description}
              </p>
            </CardContent>
          </Card>

          {/* Verses */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Key Verses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleTopicResults.verses.map((verse, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg glass-effect border border-white/5 hover:border-bible-primary/30 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-4 h-4 text-bible-accent mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-bible-accent text-bible-accent">
                            {verse.reference}
                          </Badge>
                        </div>
                        <p className="text-gray-100 leading-relaxed">{verse.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Topics */}
          <Card className="glass-effect border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Related Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sampleTopicResults.relatedTopics.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="px-3 py-1 rounded-full glass-effect border border-white/10 hover:border-bible-accent hover:bg-bible-accent/10 transition-all duration-200 text-sm text-gray-300 hover:text-bible-accent"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TopicSearch;

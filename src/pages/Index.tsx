
import { useState, useEffect } from 'react';
import { Search, BookOpen, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import BibleReader from '@/components/BibleReader';
import SearchPanel from '@/components/SearchPanel';
import WordLookup from '@/components/WordLookup';
import TopicSearch from '@/components/TopicSearch';

const Index = () => {
  const [selectedTranslation, setSelectedTranslation] = useState('NIV');
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activePanel, setActivePanel] = useState('reader');

  const translations = [
    { id: 'NIV', name: 'New International Version' },
    { id: 'ESV', name: 'English Standard Version' },
    { id: 'KJV', name: 'King James Version' },
    { id: 'NASB', name: 'New American Standard Bible' },
    { id: 'NLT', name: 'New Living Translation' },
  ];

  const books = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
    'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
    'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms',
    'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel',
    'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
    'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
    'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark',
    'Luke', 'John', 'Acts', 'Romans', '1 Corinthians',
    '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
    'Colossians', '1 Thessalonians', '2 Thessalonians',
    '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter',
    '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ];

  const menuItems = [
    { id: 'reader', label: 'Bible Reader', icon: BookOpen },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'lookup', label: 'Word Lookup', icon: Search },
    { id: 'topics', label: 'Topics', icon: Search },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActivePanel('search');
  };

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'search':
        return <SearchPanel searchQuery={searchQuery} translation={selectedTranslation} />;
      case 'lookup':
        return <WordLookup />;
      case 'topics':
        return <TopicSearch />;
      default:
        return (
          <BibleReader
            translation={selectedTranslation}
            book={selectedBook}
            chapter={selectedChapter}
            onSearch={handleSearch}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bible-darker via-bible-dark to-bible-surface">
      {/* Header */}
      <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-bible-primary to-bible-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-bible-primary to-bible-accent bg-clip-text text-transparent">
                Scripture
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActivePanel(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activePanel === item.id
                      ? 'bg-bible-primary/20 text-bible-accent'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Translation Selector */}
            <div className="hidden md:block">
              <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                <SelectTrigger className="w-32 glass-effect border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-bible-surface border-white/10">
                  {translations.map((translation) => (
                    <SelectItem key={translation.id} value={translation.id}>
                      {translation.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-white/10 glass-effect">
            <div className="px-4 py-2 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePanel(item.id);
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    activePanel === item.id
                      ? 'bg-bible-primary/20 text-bible-accent'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
              <div className="pt-2 border-t border-white/10">
                <Select value={selectedTranslation} onValueChange={setSelectedTranslation}>
                  <SelectTrigger className="w-full glass-effect border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-bible-surface border-white/10">
                    {translations.map((translation) => (
                      <SelectItem key={translation.id} value={translation.id}>
                        {translation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block">
            <Card className="glass-effect border-white/10 sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-4">Navigation</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Book</label>
                    <Select value={selectedBook} onValueChange={setSelectedBook}>
                      <SelectTrigger className="glass-effect border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-bible-surface border-white/10 max-h-60">
                        {books.map((book) => (
                          <SelectItem key={book} value={book}>
                            {book}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Chapter</label>
                    <Select value={selectedChapter.toString()} onValueChange={(value) => setSelectedChapter(parseInt(value))}>
                      <SelectTrigger className="glass-effect border-white/10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-bible-surface border-white/10 max-h-60">
                        {Array.from({ length: 50 }, (_, i) => i + 1).map((chapter) => (
                          <SelectItem key={chapter} value={chapter.toString()}>
                            Chapter {chapter}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="animate-fade-in">
              {renderActivePanel()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

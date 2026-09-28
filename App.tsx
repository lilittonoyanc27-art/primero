import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2,
  Eye,
  EyeOff,
  Play,
  Square,
  RotateCcw,
  Search,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  CheckCircle2,
  Type,
  Layers
} from 'lucide-react';
import {
  TOPICS_DATA,
  TEACHER_EXTRA_QUESTIONS,
  RAPID_QUESTIONS,
  EXAM_TOPICS_12,
  DialogueTopic,
  QuickQuestion
} from './examData';
import { speechService } from './speechHelper';

type AppMode = 'dialogue' | 'questions12' | 'rapid' | 'flashcards';
type FontSizeSetting = 'medium' | 'large' | 'xlarge';
type CategoryFilter = 'all' | 'ciencias' | 'lengua';

export default function App() {
  // Navigation & Mode
  const [currentMode, setCurrentMode] = useState<AppMode>('dialogue');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('evolution');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [dialogueType, setDialogueType] = useState<'standard' | 'extended'>('standard');
  const [showExtraQuestions, setShowExtraQuestions] = useState<boolean>(false);

  // Font Size: larger default
  const [fontSize, setFontSize] = useState<FontSizeSetting>('large');

  // Translation visibility states (set of IDs that are revealed)
  const [revealedArmenianMap, setRevealedArmenianMap] = useState<Record<string, boolean>>({});
  const [globalShowAll, setGlobalShowAll] = useState<boolean>(false);

  // Audio state
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // Rapid Quiz interactive state
  const [rapidIndex, setRapidIndex] = useState<number>(0);
  const [rapidRevealed, setRapidRevealed] = useState<boolean>(false);
  const [rapidCompleted, setRapidCompleted] = useState<Record<number, boolean>>({});

  // Filtered topics according to category
  const filteredTopics = useMemo(() => {
    if (categoryFilter === 'all') return TOPICS_DATA;
    return TOPICS_DATA.filter(t => t.category === categoryFilter);
  }, [categoryFilter]);

  // Active topic object
  const currentTopic: DialogueTopic = useMemo(() => {
    return TOPICS_DATA.find(t => t.id === selectedTopicId) || TOPICS_DATA[0];
  }, [selectedTopicId]);

  const currentTopic12 = useMemo(() => {
    return EXAM_TOPICS_12.find(t => t.id === selectedTopicId) || EXAM_TOPICS_12[0];
  }, [selectedTopicId]);

  // Current active lines in dialogue mode
  const currentLines = useMemo(() => {
    if (showExtraQuestions) return [];
    if (dialogueType === 'extended' && currentTopic.extendedLines) {
      return currentTopic.extendedLines;
    }
    return currentTopic.lines;
  }, [currentTopic, dialogueType, showExtraQuestions]);

  // Flashcard items list (all 13 topics combined)
  const allStudyCards = useMemo(() => {
    const list: Array<{ id: string; es: string; hy: string; context: string; category: string }> = [];
    TOPICS_DATA.forEach(t => {
      t.lines.forEach((l, idx) => {
        list.push({
          id: `${t.id}-${idx}`,
          es: l.es,
          hy: l.hy,
          context: `${t.titleEs} · ${l.speaker === 'profesor' ? 'Profesor' : 'Alumno'}`,
          category: t.categoryLabelRu
        });
      });
    });
    return list;
  }, []);

  // Filtered items when searching
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const results: Array<{
      id: string;
      topicTitle: string;
      es: string;
      hy: string;
      speaker?: string;
      type: string;
    }> = [];

    // Search across all 13 topics
    TOPICS_DATA.forEach(topic => {
      topic.lines.forEach(l => {
        if (l.es.toLowerCase().includes(query) || l.hy.toLowerCase().includes(query)) {
          results.push({
            id: l.id,
            topicTitle: topic.titleEs,
            es: l.es,
            hy: l.hy,
            speaker: l.speaker === 'profesor' ? '👩‍🏫 Profesor' : '👦 Alumno',
            type: topic.categoryLabelRu
          });
        }
      });
    });

    // Search in teacher extra questions
    TEACHER_EXTRA_QUESTIONS.forEach(eq => {
      if (
        eq.teacherEs.toLowerCase().includes(query) ||
        eq.teacherHy.toLowerCase().includes(query) ||
        eq.studentEs.toLowerCase().includes(query) ||
        eq.studentHy.toLowerCase().includes(query)
      ) {
        results.push({
          id: `extra-search-${eq.id}`,
          topicTitle: 'Дополнительные вопросы учителя',
          es: `${eq.teacherEs} -> ${eq.studentEs}`,
          hy: `${eq.teacherHy} -> ${eq.studentHy}`,
          speaker: '👩‍🏫 / 👦',
          type: 'Доп. вопрос'
        });
      }
    });

    return results;
  }, [searchQuery]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      speechService.stop();
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, []);

  // Toggle single Armenian translation
  const toggleTranslation = (id: string) => {
    setRevealedArmenianMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle all translations
  const handleToggleGlobalTranslations = () => {
    const nextState = !globalShowAll;
    setGlobalShowAll(nextState);
    if (!nextState) {
      setRevealedArmenianMap({});
    }
  };

  // Check if translation is visible
  const isTranslationVisible = (id: string): boolean => {
    if (globalShowAll) return true;
    return !!revealedArmenianMap[id];
  };

  // Pronounce Spanish text
  const handleSpeak = (id: string, text: string) => {
    if (activeSpeakingId === id) {
      speechService.stop();
      setActiveSpeakingId(null);
      return;
    }

    setActiveSpeakingId(id);
    speechService.speak(
      text,
      speechRate,
      () => setActiveSpeakingId(id),
      () => setActiveSpeakingId(null)
    );
  };

  // Autoplay dialogue in order
  const handleAutoplay = () => {
    if (isAutoplaying) {
      setIsAutoplaying(false);
      speechService.stop();
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      return;
    }

    setIsAutoplaying(true);
    let index = 0;

    const playNext = () => {
      if (index >= currentLines.length) {
        setIsAutoplaying(false);
        setActiveSpeakingId(null);
        return;
      }

      const line = currentLines[index];
      setActiveSpeakingId(line.id);

      speechService.speak(
        line.es,
        speechRate,
        undefined,
        () => {
          index++;
          autoplayTimerRef.current = setTimeout(() => {
            playNext();
          }, 1200);
        }
      );
    };

    playNext();
  };

  // Dynamic typography classes based on user's font size choice
  const textClasses = useMemo(() => {
    switch (fontSize) {
      case 'medium':
        return {
          spanish: 'text-base sm:text-lg font-bold leading-snug',
          armenian: 'text-sm sm:text-base font-armenian leading-relaxed',
          speakerLabel: 'text-xs font-semibold',
          padding: 'p-4 sm:p-5'
        };
      case 'xlarge':
        return {
          spanish: 'text-xl sm:text-2xl font-extrabold leading-snug tracking-tight',
          armenian: 'text-lg sm:text-xl font-armenian font-medium leading-relaxed',
          speakerLabel: 'text-sm font-bold',
          padding: 'p-6 sm:p-7'
        };
      case 'large':
      default:
        return {
          spanish: 'text-lg sm:text-xl font-bold leading-snug',
          armenian: 'text-base sm:text-lg font-armenian leading-relaxed',
          speakerLabel: 'text-xs sm:text-sm font-semibold',
          padding: 'p-4 sm:p-6'
        };
    }
  }, [fontSize]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-3.5 sm:px-6 py-3 flex items-center justify-between shadow-xs">
        {/* Logo and title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            🇪🇸
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 flex items-center gap-1.5 leading-tight">
              Экзамен: 13 Тем
              <span className="text-xs font-normal text-slate-500 hidden sm:inline">· Испанский + Армянский</span>
            </h1>
          </div>
        </div>

        {/* Desktop Mode Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => {
              setCurrentMode('dialogue');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              currentMode === 'dialogue'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              Живой диалог (13 тем)
            </span>
          </button>
          <button
            onClick={() => {
              setCurrentMode('questions12');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              currentMode === 'questions12'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
              Вопросы экзаменатора
            </span>
          </button>
          <button
            onClick={() => {
              setCurrentMode('rapid');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              currentMode === 'rapid'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Блиц-тест
            </span>
          </button>
          <button
            onClick={() => {
              setCurrentMode('flashcards');
              setSearchQuery('');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              currentMode === 'flashcards'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              Карточки
            </span>
          </button>
        </nav>

        {/* Action Controls: Font Size, Speed, Translation toggle */}
        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5" title="Размер шрифта">
            <button
              onClick={() => setFontSize('medium')}
              className={`px-2 py-1 text-xs rounded-md font-semibold transition-all ${
                fontSize === 'medium' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-sm rounded-md font-bold transition-all ${
                fontSize === 'large' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Крупный шрифт (рекомендуется)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 text-base rounded-md font-extrabold transition-all ${
                fontSize === 'xlarge' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Очень крупный шрифт"
            >
              A++
            </button>
          </div>

          {/* Global Translation Toggle */}
          <button
            onClick={handleToggleGlobalTranslations}
            title={globalShowAll ? 'Скрыть переводы' : 'Показать все переводы'}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 whitespace-nowrap ${
              globalShowAll
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {globalShowAll ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4" />}
            <span className="hidden sm:inline">{globalShowAll ? 'Все открыты' : 'Клик = Перевод'}</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-b border-slate-200 px-2 py-2 overflow-x-auto gap-1">
        <button
          onClick={() => setCurrentMode('dialogue')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentMode === 'dialogue' ? 'bg-emerald-600 text-white' : 'text-slate-600'
          }`}
        >
          Диалог (13 тем)
        </button>
        <button
          onClick={() => setCurrentMode('questions12')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentMode === 'questions12' ? 'bg-blue-600 text-white' : 'text-slate-600'
          }`}
        >
          Вопросы
        </button>
        <button
          onClick={() => setCurrentMode('rapid')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentMode === 'rapid' ? 'bg-amber-600 text-white' : 'text-slate-600'
          }`}
        >
          Блиц
        </button>
        <button
          onClick={() => setCurrentMode('flashcards')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap ${
            currentMode === 'flashcards' ? 'bg-purple-600 text-white' : 'text-slate-600'
          }`}
        >
          Карточки
        </button>
      </div>

      {/* Hero bar with Search */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Школьная программа</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-emerald-700">13 Тем (Ciencias + Lengua)</span>
              <span aria-hidden="true">·</span>
              <span>Клик по фразе = армянский перевод 🇦🇲</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Живой устный скрипт для экзамена
            </h2>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Поиск по всем 13 темам (es / hy)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-6 py-6">
        {/* Search Results Screen */}
        {searchQuery.trim() !== '' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">
                Результаты поиска для «{searchQuery}» ({searchResults.length})
              </h3>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-emerald-600 font-semibold hover:underline"
              >
                Очистить поиск
              </button>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
                Ничего не найдено. Попробуйте поискать, например: <span className="font-semibold text-slate-700">fuego, nómadas, sustantivo, corteza, metales, adjetivo</span>.
              </div>
            ) : (
              <div className="grid gap-3">
                {searchResults.map(item => {
                  const isVisible = isTranslationVisible(item.id);
                  return (
                    <div
                      key={item.id}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span className="font-bold text-slate-700">{item.topicTitle}</span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md font-medium text-slate-600">{item.type}</span>
                      </div>
                      <div
                        onClick={() => toggleTranslation(item.id)}
                        className="cursor-pointer group flex items-start justify-between gap-3"
                      >
                        <div className="flex-1">
                          <div className={`${textClasses.spanish} text-slate-900 group-hover:text-emerald-700 transition-colors`}>
                            🇪🇸 {item.es}
                          </div>
                          {isVisible ? (
                            <div className={`${textClasses.armenian} text-slate-800 mt-2.5 pl-3.5 border-l-3 border-amber-400 bg-amber-50/60 p-2.5 rounded-r-xl`}>
                              🇦🇲 {item.hy}
                            </div>
                          ) : (
                            <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1 font-semibold">
                              <Eye className="w-3.5 h-3.5" />
                              Нажмите, чтобы увидеть перевод на армянский
                            </div>
                          )}
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleSpeak(item.id, item.es);
                          }}
                          className="p-2 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-slate-100"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* MODE 1: LIVE DIALOGUE (ALL 13 TOPICS) */}
            {currentMode === 'dialogue' && (
              <div className="space-y-6">
                {/* Category Filter Pills (Все / Естествознание 1-6 / Язык 7-13) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  <button
                    onClick={() => {
                      setCategoryFilter('all');
                      setShowExtraQuestions(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      categoryFilter === 'all' && !showExtraQuestions
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Все 13 тем
                  </button>
                  <button
                    onClick={() => {
                      setCategoryFilter('ciencias');
                      setShowExtraQuestions(false);
                      if (['funciones_lenguaje', 'modalidades_oracionales', 'elementos_comunicacion', 'categorias_gramaticales', 'comunicacion_textos', 'lengua_sistema', 'palabras_significados'].includes(selectedTopicId)) {
                        setSelectedTopicId('evolution');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      categoryFilter === 'ciencias' && !showExtraQuestions
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>🌍</span>
                    Темы 1–6: Естествознание и История
                  </button>
                  <button
                    onClick={() => {
                      setCategoryFilter('lengua');
                      setShowExtraQuestions(false);
                      if (['evolution', 'paleolithic', 'neolithic', 'metal_ages', 'geosphere', 'atmosphere'].includes(selectedTopicId)) {
                        setSelectedTopicId('funciones_lenguaje');
                      }
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      categoryFilter === 'lengua' && !showExtraQuestions
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span>📚</span>
                    Темы 7–13: Испанский язык и Грамматика
                  </button>
                  <button
                    onClick={() => setShowExtraQuestions(true)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      showExtraQuestions
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <span>🎤</span>
                    Доп. вопросы учителя
                  </button>
                </div>

                {/* 13 Topics Grid */}
                {!showExtraQuestions && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                    {filteredTopics.map(topic => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopicId(topic.id)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          selectedTopicId === topic.id
                            ? topic.category === 'ciencias'
                              ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                              : 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xl shrink-0">{topic.icon}</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {topic.titleEs}
                          </span>
                        </div>
                        <span className="text-xs font-armenian text-slate-600 line-clamp-1">
                          {topic.titleHy}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Topic Action Header */}
                {!showExtraQuestions && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-2xl flex items-center justify-center border border-emerald-100">
                        {currentTopic.icon}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                          {currentTopic.categoryLabelRu}
                        </div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                          {currentTopic.titleEs}
                        </h3>
                        <p className="text-sm font-armenian text-slate-600 mt-0.5">
                          {currentTopic.titleHy}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Standard vs Extended toggle for topics with extended versions */}
                      {currentTopic.extendedLines && (
                        <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs">
                          <button
                            onClick={() => setDialogueType('standard')}
                            className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                              dialogueType === 'standard'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600'
                            }`}
                          >
                            Краткий
                          </button>
                          <button
                            onClick={() => setDialogueType('extended')}
                            className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                              dialogueType === 'extended'
                                ? 'bg-white text-slate-900 shadow-xs'
                                : 'text-slate-600'
                            }`}
                          >
                            Полный
                          </button>
                        </div>
                      )}

                      {/* Autoplay button */}
                      <button
                        onClick={handleAutoplay}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
                          isAutoplaying
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                        }`}
                      >
                        {isAutoplaying ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current" />
                            Остановить озвучку
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            Слушать весь диалог
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Teacher Surprise Questions Component */}
                {showExtraQuestions ? (
                  <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                      <h3 className="text-base font-extrabold text-amber-950 flex items-center gap-2">
                        <span>🎤</span> Дополнительные живые вопросы учителя
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-900 mt-1">
                        Учитель на экзамене может внезапно попросить: «¿Puedes explicarlo con tus propias palabras?» (Объясни своими словами) или «¿Puedes darme un ejemplo?». Нажмите на испанский текст, чтобы увидеть армянский перевод.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {TEACHER_EXTRA_QUESTIONS.map(extra => {
                        const teacherId = `extra-t-${extra.id}`;
                        const studentId = `extra-s-${extra.id}`;
                        const isTeacherVisible = isTranslationVisible(teacherId);
                        const isStudentVisible = isTranslationVisible(studentId);

                        return (
                          <div
                            key={extra.id}
                            className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs space-y-4"
                          >
                            {/* Teacher question */}
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-xl shrink-0">
                                👩‍🏫
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">
                                  Profesor (Ուսուցիչ)
                                </div>
                                <div
                                  onClick={() => toggleTranslation(teacherId)}
                                  className="cursor-pointer group p-3.5 sm:p-4 rounded-2xl bg-blue-50/70 border border-blue-100 hover:border-blue-300 transition-all"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <p className={`${textClasses.spanish} text-slate-900 group-hover:text-blue-900 transition-colors`}>
                                      🇪🇸 {extra.teacherEs}
                                    </p>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        handleSpeak(teacherId, extra.teacherEs);
                                      }}
                                      className="p-1.5 rounded-xl text-slate-400 hover:text-blue-700 hover:bg-blue-100/50"
                                      title="Озвучить"
                                    >
                                      <Volume2 className="w-5 h-5" />
                                    </button>
                                  </div>

                                  {isTeacherVisible ? (
                                    <div className={`mt-3 pt-2.5 border-t border-blue-200 ${textClasses.armenian} text-slate-800`}>
                                      🇦🇲 {extra.teacherHy}
                                    </div>
                                  ) : (
                                    <div className="mt-1.5 text-xs text-blue-600 font-semibold">
                                      Кликните для перевода на армянский
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Student response */}
                            <div className="flex items-start gap-3 sm:gap-4 pl-4 sm:pl-10">
                              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-xl shrink-0">
                                👦
                              </div>
                              <div className="flex-1">
                                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-1">
                                  Alumno (Աշակերտ)
                                </div>
                                <div
                                  onClick={() => toggleTranslation(studentId)}
                                  className="cursor-pointer group p-3.5 sm:p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 hover:border-emerald-300 transition-all"
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <p className={`${textClasses.spanish} text-slate-900 group-hover:text-emerald-900 transition-colors`}>
                                      🇪🇸 {extra.studentEs}
                                    </p>
                                    <button
                                      onClick={e => {
                                        e.stopPropagation();
                                        handleSpeak(studentId, extra.studentEs);
                                      }}
                                      className="p-1.5 rounded-xl text-slate-400 hover:text-emerald-700 hover:bg-emerald-100/50"
                                      title="Озвучить"
                                    >
                                      <Volume2 className="w-5 h-5" />
                                    </button>
                                  </div>

                                  {isStudentVisible ? (
                                    <div className={`mt-3 pt-2.5 border-t border-emerald-200 ${textClasses.armenian} text-slate-800`}>
                                      🇦🇲 {extra.studentHy}
                                    </div>
                                  ) : (
                                    <div className="mt-1.5 text-xs text-emerald-600 font-semibold">
                                      Кликните для перевода на армянский
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* Dialogue lines list */
                  <div className="space-y-4">
                    {currentLines.map((line, index) => {
                      const isVisible = isTranslationVisible(line.id);
                      const isSpeaking = activeSpeakingId === line.id;
                      const isProf = line.speaker === 'profesor';

                      return (
                        <div
                          key={line.id}
                          className={`flex items-start gap-3 sm:gap-4 transition-all ${
                            isProf ? 'sm:mr-10' : 'sm:ml-10 flex-row-reverse'
                          }`}
                        >
                          {/* Avatar icon */}
                          <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs ${
                              isProf
                                ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            }`}
                          >
                            {isProf ? '👩‍🏫' : '👦'}
                          </div>

                          {/* Message Body */}
                          <div className={`flex-1 max-w-2xl ${isProf ? '' : 'text-right'}`}>
                            <div
                              className={`${textClasses.speakerLabel} mb-1.5 ${
                                isProf ? 'text-blue-700' : 'text-emerald-700'
                              }`}
                            >
                              {isProf ? '👩‍🏫 Profesor (Ուսուցիչ)' : '👦 Alumno (Աշակերտ)'}
                            </div>

                            {/* Interactive Card */}
                            <div
                              onClick={() => toggleTranslation(line.id)}
                              className={`cursor-pointer group text-left ${textClasses.padding} rounded-2xl border transition-all ${
                                isSpeaking
                                  ? 'border-emerald-500 bg-emerald-50/90 ring-4 ring-emerald-500/20 shadow-md'
                                  : isProf
                                  ? 'bg-white border-slate-200/90 hover:border-blue-300 hover:shadow-xs'
                                  : 'bg-emerald-50/30 border-emerald-100 hover:border-emerald-300 hover:shadow-xs'
                              }`}
                            >
                              {/* Spanish phrase & speaker button */}
                              <div className="flex items-start justify-between gap-3">
                                <div className={`${textClasses.spanish} text-slate-900 group-hover:text-slate-950`}>
                                  <span className="text-xs sm:text-sm mr-1.5 opacity-60">🇪🇸</span>
                                  {line.es}
                                </div>

                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleSpeak(line.id, line.es);
                                  }}
                                  className={`p-2 rounded-xl shrink-0 transition-colors ${
                                    isSpeaking
                                      ? 'bg-emerald-600 text-white'
                                      : 'text-slate-400 hover:text-emerald-600 hover:bg-slate-100'
                                  }`}
                                  title="Прослушать произношение"
                                >
                                  <Volume2 className="w-5 h-5" />
                                </button>
                              </div>

                              {/* Armenian Translation (Click-to-reveal) */}
                              {isVisible ? (
                                <div className={`mt-3 pt-3 border-t border-slate-200/80 ${textClasses.armenian} text-slate-800 flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-200/50`}>
                                  <span className="text-xs sm:text-sm shrink-0 mt-0.5 opacity-70">🇦🇲</span>
                                  <span>{line.hy}</span>
                                </div>
                              ) : (
                                <div className="mt-2 text-xs sm:text-sm text-slate-400 group-hover:text-emerald-700 font-semibold transition-colors flex items-center gap-1.5">
                                  <Eye className="w-4 h-4 text-emerald-600" />
                                  <span>Кликните для перевода на армянский (Հայերեն թարգմանություն)</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* MODE 2: 12 EXAM QUESTIONS & CLAVE (FOR TEACHER / PARENT READING) */}
            {currentMode === 'questions12' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {EXAM_TOPICS_12.map(topic => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopicId(topic.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        selectedTopicId === topic.id
                          ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-500/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{topic.icon}</span>
                        <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {topic.titleEs}
                        </span>
                      </div>
                      <span className="text-xs font-armenian text-slate-600 truncate">
                        {topic.titleHy}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-blue-950">
                      {currentTopic12.titleEs} · Экзаменационные вопросы и Ключ (Clave)
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-800 mt-0.5">
                      Экзаменатор читает вопросы вслух. Нажмите на вопрос или ответ для армянского перевода.
                    </p>
                  </div>
                  <button
                    onClick={handleToggleGlobalTranslations}
                    className="px-4 py-2 text-xs font-bold bg-white text-blue-900 border border-blue-300 rounded-xl shadow-xs hover:bg-blue-50 transition-colors"
                  >
                    {globalShowAll ? 'Скрыть все ответы' : 'Показать все ответы'}
                  </button>
                </div>

                <div className="grid gap-4">
                  {currentTopic12.questions.map(q => {
                    const qId = `q12-${currentTopic12.id}-${q.id}`;
                    const aId = `ans12-${currentTopic12.id}-${q.id}`;
                    const isQVisible = isTranslationVisible(qId);
                    const isAVisible = isTranslationVisible(aId);

                    return (
                      <div
                        key={q.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs transition-all hover:border-slate-300"
                      >
                        {/* Question */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                              {q.id}
                            </span>
                            <div className="flex-1">
                              <div
                                onClick={() => toggleTranslation(qId)}
                                className="cursor-pointer group inline-block"
                              >
                                <p className={`${textClasses.spanish} text-slate-900 group-hover:text-blue-700 transition-colors`}>
                                  🇪🇸 {q.questionEs}
                                </p>
                                {isQVisible ? (
                                  <p className={`${textClasses.armenian} text-slate-700 mt-1.5`}>
                                    🇦🇲 {q.questionHy}
                                  </p>
                                ) : (
                                  <span className="text-xs text-blue-600 font-semibold group-hover:underline">
                                    Клик: перевод вопроса
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleSpeak(qId, q.questionEs)}
                            className="p-2 text-slate-400 hover:text-blue-600 rounded-xl hover:bg-slate-50 shrink-0"
                            title="Озвучить вопрос"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Clave */}
                        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-start justify-between gap-3 pl-8 sm:pl-10">
                          <div className="flex-1">
                            <div className="text-xs font-bold text-emerald-700 mb-1 flex items-center gap-1.5 uppercase tracking-wide">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Ключ ответа (Clave / Պատասխան):
                            </div>
                            <div
                              onClick={() => toggleTranslation(aId)}
                              className="cursor-pointer group p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 transition-all"
                            >
                              <p className={`${textClasses.spanish} text-slate-900 group-hover:text-emerald-900`}>
                                🇪🇸 {q.answerEs}
                              </p>
                              {isAVisible ? (
                                <p className={`${textClasses.armenian} text-slate-700 mt-2 pt-2 border-t border-emerald-200`}>
                                  🇦🇲 {q.answerHy}
                                </p>
                              ) : (
                                <span className="text-xs text-emerald-600 font-semibold">
                                  Кликните, чтобы увидеть ответ на армянском
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => handleSpeak(aId, q.answerEs)}
                            className="p-2 text-slate-400 hover:text-emerald-600 rounded-xl hover:bg-slate-50 shrink-0 mt-6"
                            title="Озвучить ответ"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MODE 3: RAPID FIRE BLITZ (10 FAST QUESTIONS) */}
            {currentMode === 'rapid' && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="bg-amber-50/90 border border-amber-200 rounded-3xl p-6 text-center shadow-xs">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 text-2xl mb-2.5">
                    🔥
                  </div>
                  <h3 className="text-xl font-extrabold text-amber-950">
                    Мини-экзамен: 10 быстрых вопросов
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 mt-1 max-w-md mx-auto">
                    Экспресс-проверка ключевых понятий по естествознанию и языку.
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-amber-900">
                    <span>Вопрос {rapidIndex + 1} из {RAPID_QUESTIONS.length}</span>
                    <span aria-hidden="true">·</span>
                    <span>Отвечено: {Object.keys(rapidCompleted).length}</span>
                  </div>
                </div>

                {(() => {
                  const currentQ = RAPID_QUESTIONS[rapidIndex];
                  return (
                    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                      <div>
                        <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2 flex items-center justify-between">
                          <span>👩‍🏫 Вопрос учителя #{rapidIndex + 1}</span>
                          <button
                            onClick={() => handleSpeak(`rapid-q-${currentQ.id}`, currentQ.questionEs)}
                            className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-semibold"
                          >
                            <Volume2 className="w-4 h-4" />
                            <span className="text-xs">Слушать</span>
                          </button>
                        </div>
                        <h4 className={`${textClasses.spanish} text-slate-900`}>
                          🇪🇸 {currentQ.questionEs}
                        </h4>
                        <p className={`${textClasses.armenian} text-slate-600 mt-1.5`}>
                          🇦🇲 {currentQ.questionHy}
                        </p>
                      </div>

                      {!rapidRevealed ? (
                        <div className="pt-4 border-t border-slate-100">
                          <button
                            onClick={() => {
                              setRapidRevealed(true);
                              setRapidCompleted(prev => ({ ...prev, [currentQ.id]: true }));
                            }}
                            className="w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm sm:text-base hover:bg-emerald-700 transition-colors shadow-xs flex items-center justify-center gap-2"
                          >
                            <Eye className="w-5 h-5" />
                            Показать ответ ученика (Պատասխան)
                          </button>
                        </div>
                      ) : (
                        <div className="pt-4 border-t border-slate-100 space-y-4">
                          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1.5">
                              <span>👦 Ответ ученика (Alumno):</span>
                              <button
                                onClick={() => handleSpeak(`rapid-a-${currentQ.id}`, currentQ.answerEs)}
                                className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold"
                              >
                                <Volume2 className="w-4 h-4" />
                                <span>Слушать</span>
                              </button>
                            </div>
                            <p className={`${textClasses.spanish} text-slate-900`}>
                              🇪🇸 {currentQ.answerEs}
                            </p>
                            <p className={`${textClasses.armenian} text-slate-800 mt-2 pt-2 border-t border-emerald-200/60`}>
                              🇦🇲 {currentQ.answerHy}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-3 pt-2">
                            <button
                              disabled={rapidIndex === 0}
                              onClick={() => {
                                setRapidIndex(prev => Math.max(0, prev - 1));
                                setRapidRevealed(false);
                              }}
                              className="px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
                            >
                              ← Предыдущий
                            </button>
                            <button
                              onClick={() => {
                                if (rapidIndex < RAPID_QUESTIONS.length - 1) {
                                  setRapidIndex(prev => prev + 1);
                                  setRapidRevealed(false);
                                } else {
                                  setRapidIndex(0);
                                  setRapidRevealed(false);
                                }
                              }}
                              className="px-5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-slate-900 text-white hover:bg-slate-800 shadow-xs"
                            >
                              {rapidIndex < RAPID_QUESTIONS.length - 1 ? 'Следующий вопрос →' : 'Пройти снова ↺'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* MODE 4: FLASHCARDS (ALL PHRASES) */}
            {currentMode === 'flashcards' && (
              <div className="max-w-xl mx-auto space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    Обучающие карточки
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Кликните по карточке, чтобы перевернуть (🇪🇸 Испанский ⇄ 🇦🇲 Армянский)
                  </p>
                  <div className="text-xs font-bold text-slate-500 mt-2">
                    Карточка {flashcardIndex + 1} из {allStudyCards.length}
                  </div>
                </div>

                {(() => {
                  const card = allStudyCards[flashcardIndex];
                  return (
                    <div className="space-y-4">
                      {/* Flip card */}
                      <div
                        onClick={() => setIsCardFlipped(prev => !prev)}
                        className={`cursor-pointer min-h-[260px] sm:min-h-[300px] p-6 sm:p-8 rounded-3xl border-2 transition-all flex flex-col justify-between shadow-xs ${
                          isCardFlipped
                            ? 'bg-amber-50/70 border-amber-300'
                            : 'bg-white border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            {card.context}
                          </span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            {isCardFlipped ? '🇦🇲 Армянский' : '🇪🇸 Испанский'}
                          </span>
                        </div>

                        <div className="my-auto py-4 text-center">
                          {!isCardFlipped ? (
                            <div className={`${textClasses.spanish} text-slate-900`}>
                              {card.es}
                            </div>
                          ) : (
                            <div className={`${textClasses.armenian} text-slate-800`}>
                              {card.hy}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                          <span>Нажмите, чтобы перевернуть</span>
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleSpeak(`flash-${card.id}`, card.es);
                            }}
                            className="p-2 text-slate-500 hover:text-emerald-700 rounded-xl hover:bg-slate-100"
                            title="Произношение"
                          >
                            <Volume2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between gap-3">
                        <button
                          disabled={flashcardIndex === 0}
                          onClick={() => {
                            setFlashcardIndex(prev => Math.max(0, prev - 1));
                            setIsCardFlipped(false);
                          }}
                          className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none"
                        >
                          ← Назад
                        </button>
                        <button
                          onClick={() => setIsCardFlipped(prev => !prev)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs sm:text-sm font-bold text-slate-800"
                        >
                          Перевернуть ↺
                        </button>
                        <button
                          disabled={flashcardIndex >= allStudyCards.length - 1}
                          onClick={() => {
                            setFlashcardIndex(prev => Math.min(allStudyCards.length - 1, prev + 1));
                            setIsCardFlipped(false);
                          }}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-700 shadow-xs disabled:opacity-30 disabled:pointer-events-none"
                        >
                          Вперёд →
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500 mt-auto">
        <p className="max-w-2xl mx-auto">
          Школьный тренажёр устного экзамена по наукам и испанскому языку (13 тем) · 🇪🇸 Español ⇄ 🇦🇲 Հայերեն
        </p>
      </footer>
    </div>
  );
}

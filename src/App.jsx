import React, { useState, useEffect } from 'react';
import { 
  Camera, ShoppingBag, Scissors, Heart, Menu, X, Star, Image as ImageIcon, Sparkles, BookHeart, 
  Loader2, Globe, ArrowRight, RotateCcw, Info, Upload, Check, Plus
} from 'lucide-react';

/**
 * Fabric Re:Life - Final Deployment Version
 * * 모든 수정사항 반영 완료 (이미지 경로, 부자재, 갤러리 UI)
 */

// --- Data Structure ---

const CATEGORIES = ['전체', '겉옷', '아기옷', '상의', '하의', '원피스'];

const STORIES = [
  {
    id: 1,
    type: '겉옷',
    title: "아버지의 양복, 거실의 품격이 되다",
    desc: "30년 간 가족을 위해 입으셨던 아버지의 회색 양복. 차가운 옷장 대신 따뜻한 거실에서 매일 아버지를 기억합니다.",
    originalImage: "/images/IMG_0590.jpg",
    items: [
      { id: '1-1', type: 'Cushion', name: "클래식 수트 쿠션", difficulty: 1, price: "18,900", img: "/images/IMG_0597.jpg", desc: "앞주머니 디테일을 살린 중후한 멋" },
      { id: '1-2', type: 'Bag', name: "데일리 수트 토트백", difficulty: 2, price: "24,900", img: "/images/IMG_0596.jpg", desc: "라펠 디자인을 그대로 살린 가방" },
      { id: '1-3', type: 'Poster', name: "메모리 드로잉 포스터", difficulty: 3, price: "14,900", img: "/images/IMG_0595.jpg", desc: "아버지의 뒷모습을 담은 패브릭 아트" }
    ]
  },
  {
    id: 2,
    type: '원피스',
    title: "설렘 가득했던 그날의 임부복",
    desc: "아이를 기다리며 입었던 소중한 원피스. 독특한 컬러 블록과 패턴을 살려 아이 방의 힙한 인테리어 포인트가 되었습니다.",
    originalImage: "/images/IMG_0582.jpg",
    items: [
      { id: '2-1', type: 'Cushion', name: "컬러블록 포인트 쿠션", difficulty: 1, price: "18,900", img: "/images/IMG_0584.jpg", desc: "원피스의 배색을 활용한 모던 디자인" },
      { id: '2-2', type: 'Bag', name: "러플 포켓 에코백", difficulty: 2, price: "22,900", img: "/images/IMG_0583.jpg", desc: "치마 주름을 살린 러블리한 가방" },
      { id: '2-3', type: 'Poster', name: "업사이클링 콜라주 포스터", difficulty: 3, price: "15,900", img: "/images/IMG_0581.jpg", desc: "자투리 천을 이어 붙인 하나뿐인 작품" }
    ]
  },
  {
    id: 3,
    type: '하의',
    title: "가장 빛나던 시절의 스키니진",
    desc: "옷장 깊숙이 있던, 이제는 작아진 청바지. 튼튼한 데님 소재의 특성을 살려 빈티지하고 힙한 오브제로 변신했습니다.",
    originalImage: "/images/IMG_0573.jpg",
    items: [
      { id: '3-1', type: 'Cushion', name: "데님 포켓 쿠션", difficulty: 1, price: "19,900", img: "/images/IMG_0586.jpg", desc: "뒷주머니를 수납공간으로 활용한 센스" },
      { id: '3-2', type: 'Bag', name: "빈티지 데님 숄더백", difficulty: 2, price: "25,900", img: "/images/IMG_0588.jpg", desc: "청바지 통을 그대로 살린 튼튼한 가방" },
      { id: '3-3', type: 'Poster', name: "데님 소울 태피스트리", difficulty: 3, price: "14,900", img: "/images/IMG_0589.jpg", desc: "청바지의 워싱과 질감을 살린 벽걸이" }
    ]
  },
  {
    id: 4,
    type: '아기옷',
    title: "세상에 처음 나온 날, 배냇저고리",
    desc: "너무 작아져 버린 우리 아이 첫 옷. 부드러운 오가닉 코튼 소재로 아이의 첫 친구가 되어줄 인형과 소품을 만들었어요.",
    originalImage: "/images/IMG_0574.jpg",
    items: [
      { id: '4-1', type: 'Cushion', name: "소프트 애착 쿠션", difficulty: 1, price: "17,900", img: "/images/IMG_0577.jpg", desc: "배냇저고리 여밈을 살린 포근한 쿠션" },
      { id: '4-2', type: 'Doll', name: "업사이클링 토끼인형", difficulty: 2, price: "29,900", img: "/images/IMG_0576.jpg", desc: "아이 옷으로 만들어 더 의미 있는 친구" },
      { id: '4-3', type: 'Frame', name: "첫 만남 기록 액자", difficulty: 3, price: "21,900", img: "/images/IMG_0585.jpg", desc: "탄생 정보와 함께 보관하는 추억 프레임" }
    ]
  },
  {
    id: 5,
    type: '상의',
    title: "유행 지난 체크 셔츠, 빈티지 소품이 되다",
    desc: "유행이 지나 손이 잘 가지 않던 체크 남방. 익숙한 패턴이 주는 편안함을 살려 집안 곳곳에 따뜻한 빈티지 무드를 더했습니다.",
    originalImage: "/images/IMG_0572.jpg", 
    items: [
      { id: '5-1', type: 'Cushion', name: "버튼 포인트 체크 쿠션", difficulty: 1, price: "18,900", img: "/images/IMG_0580.jpg", desc: "셔츠 앞섬의 단추 디테일을 그대로 살린 디자인" },
      { id: '5-2', type: 'Bag', name: "스퀘어 체크 토트백", difficulty: 2, price: "23,900", img: "/images/IMG_0579.jpg", desc: "가슴 포켓을 살려 실용성을 더한 가벼운 가방" },
      { id: '5-3', type: 'Poster', name: "타이포그래피 아트 포스터", difficulty: 3, price: "16,900", img: "/images/IMG_0578.jpg", desc: "레터링 프린팅으로 힙하게 변신한 월 데코" }
    ]
  }
];

// --- Sub Components ---

const Navbar = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: '홈' },
    { id: 'gallery', label: '변신 사례' },
    { id: 'studio', label: '무료 체험' },
    { id: 'market', label: '키트 구매' },
    { id: 'about', label: '완성 작품' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#FFF9F0]/95 backdrop-blur-md shadow-sm border-b border-[#E5E0D8]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <Scissors className="h-6 w-6 text-[#E07A5F]" />
            <span className="text-lg md:text-xl font-bold tracking-tight text-[#2D3142]">Fabric Re:Life</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                className={`font-medium tracking-wide transition-colors ${
                  activePage === link.id 
                    ? 'text-[#E07A5F]' 
                    : 'text-[#5D5F65] hover:text-[#E07A5F]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-[#5D5F65] hover:text-[#E07A5F] font-medium">로그인</button>
            <button className="bg-[#6B8E73] text-white px-5 py-2 rounded-full font-semibold hover:bg-[#55725C] transition shadow-lg hover:shadow-[#6B8E73]/30 transform hover:-translate-y-0.5">
              시작하기
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-[#2D3142]">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFF9F0] border-b border-[#E5E0D8] absolute w-full top-16 left-0 shadow-xl z-50">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => { setActivePage(link.id); setIsMenuOpen(false); }}
                className="block w-full text-left px-3 py-4 text-[#2D3142] font-medium hover:bg-[#F5F0E8] hover:text-[#E07A5F] rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#2D3142] text-[#F5F0E8] py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Scissors className="h-6 w-6 text-[#6B8E73]" />
            <span className="text-xl font-bold text-[#F5F0E8]">Fabric Re:Life</span>
          </div>
          <p className="text-sm font-normal leading-relaxed max-w-sm text-[#D1D5DB]">
            옷장 속 잠든 옷에 새로운 생명을 불어넣습니다.<br/>
            추억을 간직하는 가장 따뜻하고 지속 가능한 방법, Fabric Re:Life와 함께하세요.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Service</h4>
          <ul className="space-y-2 text-sm font-normal text-[#D1D5DB]">
            <li><a href="#" className="hover:text-[#6B8E73]">무료 체험</a></li>
            <li><a href="#" className="hover:text-[#6B8E73]">키트 구매</a></li>
            <li><a href="#" className="hover:text-[#6B8E73]">멤버십</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm font-normal text-[#D1D5DB]">
            <li><a href="#" className="hover:text-[#6B8E73]">자주 묻는 질문</a></li>
            <li><a href="#" className="hover:text-[#6B8E73]">문의하기</a></li>
            <li><a href="#" className="hover:text-[#6B8E73]">이용약관</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#3E4255] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs font-normal text-[#9CA3AF]">© 2024 Fabric Re:Life. All rights reserved.</p>
        <div className="flex gap-4">
          <Globe className="w-5 h-5 cursor-pointer hover:text-white" />
          <div className="w-5 h-5 bg-[#3E4255] rounded-full cursor-pointer hover:bg-[#4B5563]"></div>
          <div className="w-5 h-5 bg-[#3E4255] rounded-full cursor-pointer hover:bg-[#4B5563]"></div>
        </div>
      </div>
    </div>
  </footer>
);

// --- StoryCard Component (Mobile Optimized: After Focus) ---

const StoryCard = ({ story, setActivePage }) => {
  // Default to 0 (First Item/After) instead of -1 (Before)
  const [selectedIndex, setSelectedIndex] = useState(0); 

  const currentItem = selectedIndex === -1 ? null : story.items[selectedIndex];
  const displayImage = selectedIndex === -1 ? story.originalImage : currentItem.img;

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-[#E5E0D8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row h-auto">
      
      {/* Top: Main Display Area */}
      <div className="w-full md:w-[55%] bg-[#F5F0E8] relative overflow-hidden group aspect-[4/3] md:aspect-auto md:min-h-[450px]">
         <img 
            src={displayImage} 
            alt="Main Display" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=No+Image'; }}
         />
         
         {/* Top Overlay Badge */}
         <div className="absolute top-4 left-4 flex gap-2">
            <div className={`backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 ${selectedIndex === -1 ? 'bg-[#2D3142]/90 text-white' : 'bg-white/90 text-[#E07A5F]'}`}>
                {selectedIndex === -1 ? 'Before' : 'After'}
            </div>
         </div>
      </div>

      {/* Bottom: Info & Controls */}
      <div className="w-full md:w-[45%] p-5 md:p-8 flex flex-col bg-white">
         
         {/* 1. Header Info */}
         <div className="mb-4 md:mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-[#2D3142] mb-2 leading-tight">
                {selectedIndex === -1 ? story.title : currentItem.name}
            </h3>
            <p className="text-[#5D5F65] text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                {selectedIndex === -1 ? story.desc : currentItem.desc}
            </p>
         </div>

         {/* 2. Thumbnails (Now 4 items including Before) */}
         <div className="mb-6 mt-auto">
            <p className="text-[10px] md:text-xs text-[#9CA3AF] font-bold mb-2 uppercase tracking-wider">
                변신 과정 보기
            </p>
            <div className="flex gap-2 md:gap-3">
                {/* Original (Before) Thumbnail - First Position */}
                <button 
                    onClick={() => setSelectedIndex(-1)}
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border transition-all ${selectedIndex === -1 ? 'border-[#2D3142] ring-2 ring-[#2D3142]/10' : 'border-slate-100 opacity-70 hover:opacity-100'}`}
                >
                    <img src={story.originalImage} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/100x100?text=Before'} />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-[8px] text-white text-center py-0.5">Before</span>
                </button>

                {/* After Item Thumbnails */}
                {story.items.map((item, idx) => (
                    <button 
                        key={item.id}
                        onClick={() => setSelectedIndex(idx)}
                        className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border transition-all ${selectedIndex === idx ? 'border-[#E07A5F] ring-2 ring-[#E07A5F]/20' : 'border-slate-100 opacity-70 hover:opacity-100'}`}
                    >
                        <img src={item.img} className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://via.placeholder.com/100x100'} />
                    </button>
                ))}
            </div>
         </div>

         {/* 3. Action Buttons */}
         <div className="pt-4 border-t border-[#F5F0E8]">
             {selectedIndex !== -1 ? (
                 <div className="animate-fade-in-up space-y-3">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-[#2D3142] font-bold text-lg">{currentItem.price}원</span>
                        <div className="flex items-center gap-1 text-[#5D5F65] text-xs bg-[#F5F0E8] px-2 py-1 rounded">
                            <span className="font-bold">난이도</span>
                            {[...Array(3)].map((_, i) => (
                                <Star key={i} className={`w-3 h-3 ${i < currentItem.difficulty ? 'text-[#E07A5F] fill-[#E07A5F]' : 'text-[#D1D5DB]'}`} />
                            ))}
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <button 
                            onClick={() => setActivePage('market')}
                            className="flex-1 bg-white text-[#2D3142] border border-[#E5E0D8] hover:border-[#2D3142] py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            키트 구매
                        </button>
                        <button 
                            onClick={() => setActivePage('studio')}
                            className="flex-1 bg-[#6B8E73] hover:bg-[#55725C] text-white py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4" />
                            제작 의뢰하기
                        </button>
                     </div>
                 </div>
             ) : (
                 <div className="flex items-center justify-center h-12 text-xs text-[#9CA3AF] bg-[#F9FAFB] rounded-xl">
                    <Info className="w-3 h-3 mr-1" />
                    결과물을 선택하면 제작 정보를 볼 수 있습니다
                 </div>
             )}
         </div>

      </div>
    </div>
  );
};

// --- Page Components ---

const HomePage = ({ setActivePage }) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStoryIndex((prev) => (prev + 1) % STORIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden px-4 bg-[#FFF9F0]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6B8E73]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E07A5F]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] border border-[#E07A5F]/20 text-xs font-semibold tracking-wide mb-4">
             🌱 추억을 새로운 일상으로
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2D3142] leading-tight mb-4">
            옷장 속 추억,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#6B8E73]">
              새로운 오브제로
            </span>
          </h1>
          <p className="text-base md:text-lg text-[#5D5F65] mb-8 max-w-xl mx-auto leading-relaxed font-normal">
            사진 한 장이면 충분합니다. AI가 디자인을 제안하고, 나만의 제작 키트를 보내드려요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <button onClick={() => setActivePage('studio')} className="flex items-center justify-center bg-[#6B8E73] text-white px-6 py-3.5 rounded-full font-semibold text-base hover:bg-[#55725C] transition shadow-lg hover:shadow-[#6B8E73]/20 transform hover:-translate-y-1">
              <Camera className="w-5 h-5 mr-2" />
              내 옷 변신시키기
            </button>
            <button onClick={() => setActivePage('gallery')} className="flex items-center justify-center bg-white text-[#2D3142] border border-[#2D3142] px-6 py-3.5 rounded-full font-semibold text-base hover:bg-[#2D3142] hover:text-white transition">
              변신 사례 보기
            </button>
          </div>

          <div className="md:hidden grid grid-cols-4 gap-2 max-w-sm mx-auto mb-6 px-2">
            <button onClick={() => setActivePage('gallery')} className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] transition-all">
                <ImageIcon className="w-5 h-5 text-[#E07A5F]" />
              </div>
              <span className="text-[10px] font-semibold text-[#5D5F65]">변신 사례</span>
            </button>
            <button onClick={() => setActivePage('studio')} className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] transition-all">
                <Sparkles className="w-5 h-5 text-[#6B8E73]" />
              </div>
              <span className="text-[10px] font-semibold text-[#5D5F65]">무료 체험</span>
            </button>
            <button onClick={() => setActivePage('market')} className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] transition-all">
                <ShoppingBag className="w-5 h-5 text-[#E07A5F]" />
              </div>
              <span className="text-[10px] font-semibold text-[#5D5F65]">키트 구매</span>
            </button>
            <button onClick={() => setActivePage('about')} className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] transition-all">
                <BookHeart className="w-5 h-5 text-[#6B8E73]" />
              </div>
              <span className="text-[10px] font-semibold text-[#5D5F65]">완성 작품</span>
            </button>
          </div>
        </div>

        {/* Hero Slider/Card */}
        <div className="max-w-5xl mx-auto relative z-10 px-2">
            <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-80">
                        <img src={STORIES[activeStoryIndex].originalImage} className="w-full h-full object-cover" alt="Before" onError={(e) => e.target.src = 'https://via.placeholder.com/800x800?text=No+Image'} />
                        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-bold">BEFORE</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <div>
                                <h3 className="text-white text-xl font-bold mb-1">{STORIES[activeStoryIndex].title}</h3>
                                <p className="text-[#E5E0D8] text-xs font-normal line-clamp-1">{STORIES[activeStoryIndex].desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[#E07A5F] font-bold text-xs tracking-widest uppercase">After Re:Life</span>
                            <div className="flex gap-1.5">
                                {STORIES.map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === activeStoryIndex ? 'bg-[#E07A5F] w-4' : 'bg-[#E5E0D8]'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {STORIES[activeStoryIndex].items.map((item, idx) => (
                                <div key={idx} className="group cursor-pointer">
                                    <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-[#F5F0E8] relative border border-[#E5E0D8]">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'} />
                                    </div>
                                    <p className="text-xs font-bold text-[#2D3142] truncate">{item.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

const GalleryPage = ({ setActivePage }) => {
  const [filter, setFilter] = useState('전체');
  
  const filteredStories = filter === '전체' 
    ? STORIES 
    : STORIES.filter(story => story.type === filter);

  return (
    <div className="pt-20 pb-20 px-4 min-h-screen bg-[#FFF9F0] animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2D3142] tracking-tight mb-2">TRANSFORMATION GALLERY</h1>
          <p className="text-[#5D5F65] text-sm md:text-base font-normal">의류별, 스타일별로 변신 사례를 둘러보세요.</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-1.5 md:gap-2 mb-10 flex-wrap px-2">
          {CATEGORIES.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
                filter === f 
                  ? 'bg-[#2D3142] text-white shadow-md' 
                  : 'bg-white text-[#5D5F65] border border-[#E5E0D8]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Story Grid (Using New Interactive StoryCard) */}
        <div className="space-y-8 md:space-y-12">
          {filteredStories.map(story => (
            <div key={story.id} className="animate-fade-in-up">
               <StoryCard story={story} setActivePage={setActivePage} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StudioPage = () => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(2);
    }, 2500);
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-[#FFF9F0] animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${step >= s ? 'bg-[#2D3142] text-white' : 'bg-[#E5E0D8] text-[#9CA3AF]'}`}>
                            {step > s ? <Check className="w-6 h-6" /> : s}
                        </div>
                        {s !== 3 && <div className={`w-16 h-1 bg-[#E5E0D8] mx-2 ${step > s ? 'bg-[#2D3142]' : ''}`} />}
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#E5E0D8] min-h-[500px] flex flex-col items-center justify-center p-8 md:p-12 text-center">
            {isAnalyzing ? (
                <div className="animate-fade-in">
                    <Loader2 className="w-16 h-16 text-[#E07A5F] animate-spin mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-[#2D3142] mb-2">AI가 원단을 분석 중입니다...</h3>
                    <p className="text-[#5D5F65] font-normal">소재 종류, 오염도, 가용 면적을 계산하고 있습니다.</p>
                </div>
            ) : (
                <>
                    {step === 1 && (
                        <div className="w-full max-w-lg animate-fade-in">
                            <h2 className="text-3xl font-bold text-[#2D3142] mb-4">Design Your Memory</h2>
                            <p className="text-[#5D5F65] mb-10 font-normal">옷을 바닥에 펼치고 사진을 업로드하세요.<br/>A4 용지를 옆에 두면 크기 측정이 더 정확해집니다.</p>
                            
                            <div className="border-3 border-dashed border-[#E5E0D8] rounded-2xl p-12 hover:border-[#E07A5F] hover:bg-[#FFF9F0] transition-all cursor-pointer group" onClick={handleUpload}>
                                <div className="w-20 h-20 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-[#9CA3AF] group-hover:text-[#E07A5F]" />
                                </div>
                                <p className="font-bold text-[#2D3142] text-lg mb-2">사진 업로드하기</p>
                                <p className="text-sm text-[#5D5F65] font-normal">JPG, PNG 파일 지원 (최대 10MB)</p>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full animate-fade-in text-left">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <div className="aspect-[3/4] rounded-2xl bg-[#F5F0E8] overflow-hidden relative">
                                        <img src="https://images.unsplash.com/photo-1594938298603-c8148c783421?auto=format&fit=crop&q=80&w=800" alt="Analyzed" className="w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 border-4 border-[#6B8E73]/50 m-8 rounded-lg flex items-center justify-center">
                                            <span className="bg-[#6B8E73] text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">활용 가능 영역 85%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold text-[#2D3142] mb-6">분석 결과</h3>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between border-b border-[#E5E0D8] pb-2">
                                            <span className="text-[#5D5F65] font-normal">소재</span>
                                            <span className="font-bold text-[#2D3142]">Wool 100% (양모)</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#E5E0D8] pb-2">
                                            <span className="text-[#5D5F65] font-normal">패턴</span>
                                            <span className="font-bold text-[#2D3142]">헤링본 그레이</span>
                                        </div>
                                        <div className="flex justify-between border-b border-[#E5E0D8] pb-2">
                                            <span className="text-[#5D5F65] font-normal">추천 아이템</span>
                                            <span className="font-bold text-[#E07A5F]">쿠션, 미니백, 파우치</span>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg mb-4">제작 가능한 아이템</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-8">
                                        <div className="border-2 border-[#E07A5F] bg-[#FFF9F0] p-4 rounded-xl cursor-pointer">
                                            <p className="font-bold text-[#2D3142]">사각 쿠션</p>
                                            <p className="text-xs text-[#E07A5F] font-normal">난이도 ★☆☆</p>
                                        </div>
                                        <div className="border border-[#E5E0D8] p-4 rounded-xl cursor-pointer hover:bg-[#F5F0E8]">
                                            <p className="font-bold text-[#2D3142]">미니 토트백</p>
                                            <p className="text-xs text-[#5D5F65] font-normal">난이도 ★★☆</p>
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(3)} className="w-full bg-[#6B8E73] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#55725C] transition">
                                        이 디자인으로 도안 받기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in max-w-md mx-auto">
                            <div className="w-20 h-20 bg-[#6B8E73]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-10 h-10 text-[#6B8E73]" />
                            </div>
                            <h2 className="text-3xl font-bold text-[#2D3142] mb-4">키트 구성이 완료되었습니다!</h2>
                            <p className="text-[#5D5F65] mb-8 font-normal">
                                선택하신 '사각 쿠션' 맞춤 도안과 부자재가<br/>장바구니에 담겼습니다.
                            </p>
                            <div className="bg-[#F5F0E8] p-6 rounded-2xl mb-8 border border-[#E5E0D8]">
                                <ul className="text-left text-sm space-y-2 text-[#5D5F65] font-normal">
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#6B8E73]" /> 1:1 실물 크기 맞춤 도안</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#6B8E73]" /> 고급 YKK 지퍼 (Black)</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#6B8E73]" /> Re:Life 라벨 & 봉제 실</li>
                                    <li className="flex items-center"><Check className="w-4 h-4 mr-2 text-[#6B8E73]" /> 제작 가이드 영상 QR코드</li>
                                </ul>
                            </div>
                            {/* Main CTA: Olive Green */}
                            <button className="w-full bg-[#6B8E73] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#55725C] transition shadow-lg shadow-[#6B8E73]/30">
                                결제하러 가기
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

const MarketPage = () => {
  // Update Market Items to match Story Items + Basic Tools
  const MARKET_ITEMS = [
    { id: 1, name: "클래식 수트 가방 키트", price: "24,900원", image: "/images/IMG_0596.jpg", tag: "BEST" },
    { id: 2, name: "빈티지 데님 숄더백 키트", price: "25,900원", image: "/images/IMG_0588.jpg", tag: "HOT" },
    { id: 3, name: "애착 토끼 인형 키트", price: "29,900원", image: "/images/IMG_0576.jpg", tag: "NEW" },
    { id: 4, name: "체크 셔츠 쿠션 키트", price: "18,900원", image: "/images/IMG_0580.jpg", tag: "SALE" },
    { id: 5, name: "전문가용 재단 가위", price: "24,500원", image: "https://images.unsplash.com/photo-1590233049813-9426d0309623?auto=format&fit=crop&q=80&w=600", tag: "TOOL" },
    { id: 6, name: "오가닉 코튼 봉제실 세트", price: "8,900원", image: "https://images.unsplash.com/photo-1616092003732-2cb97992ee6b?auto=format&fit=crop&q=80&w=600", tag: "BASIC" },
    { id: 7, name: "접착 심지 & 시침핀 세트", price: "6,500원", image: "https://images.unsplash.com/photo-1605218427368-35b8602cc822?auto=format&fit=crop&q=80&w=600", tag: "BASIC" },
  ];

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-[#FFF9F0] animate-fade-in">
      <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
              <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#2D3142] mb-2">Sustainable Market</h1>
                  <p className="text-[#5D5F65] font-normal">업사이클링을 위한 모든 도구, 그리고 환경을 생각하는 굿즈.</p>
              </div>
              <div className="hidden md:flex gap-2">
                  <button className="px-4 py-2 bg-[#2D3142] text-white rounded-lg text-sm font-semibold">전체</button>
                  <button className="px-4 py-2 text-[#5D5F65] hover:bg-white rounded-lg text-sm font-semibold transition">키트</button>
                  <button className="px-4 py-2 text-[#5D5F65] hover:bg-white rounded-lg text-sm font-semibold transition">도구</button>
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MARKET_ITEMS.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-[#E5E0D8]">
                      <div className="relative aspect-square bg-[#F5F0E8] overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src='https://via.placeholder.com/400x400?text=Item'} />
                          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-[#2D3142]">
                              {item.tag}
                          </div>
                      </div>
                      <div className="p-5">
                          <h3 className="font-bold text-[#2D3142] mb-1 line-clamp-1">{item.name}</h3>
                          <p className="text-[#5D5F65] text-sm mb-4 font-normal">무료 배송</p>
                          <div className="flex items-center justify-between">
                              <span className="font-bold text-lg text-[#2D3142]">{item.price}</span>
                              <button className="p-2 bg-[#F5F0E8] rounded-full hover:bg-[#2D3142] hover:text-white transition-colors">
                                  <ShoppingBag className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-24 pb-20 px-4 min-h-screen bg-[#FFF9F0] animate-fade-in">
    <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-[#2D3142] mb-6 tracking-tight">Finished Works</h1>
        <p className="text-xl md:text-2xl text-[#5D5F65] font-normal leading-relaxed break-keep mb-8">
            당신도 이렇게 만들 수 있습니다.<br/>
            완성한 작품을 공유하고, 영감을 나눠주세요.
        </p>
        <button className="bg-[#2D3142] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#1A1D2D] transition shadow-lg flex items-center justify-center gap-2 mx-auto">
            <Camera className="w-5 h-5" />
            내 작품 올리기
        </button>
    </div>

    {/* User Gallery Grid */}
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
            "/images/IMG_0597.jpg", "/images/IMG_0596.jpg", "/images/IMG_0595.jpg",
            "/images/IMG_0584.jpg", "/images/IMG_0583.jpg", "/images/IMG_0581.jpg",
            "/images/IMG_0586.jpg", "/images/IMG_0588.jpg", "/images/IMG_0589.jpg",
            "/images/IMG_0577.jpg", "/images/IMG_0576.jpg", "/images/IMG_0585.jpg",
            "/images/IMG_0580.jpg", "/images/IMG_0579.jpg", "/images/IMG_0578.jpg"
        ].map((img, idx) => (
            <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-white shadow-sm border border-[#E5E0D8] group relative">
                <img src={img} alt="Finished Work" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => e.target.src='https://via.placeholder.com/400x400?text=Work'} />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-sm">
                        <Heart className="w-4 h-4 text-[#E07A5F]" />
                    </div>
                </div>
            </div>
        ))}
        {/* 'More' Placeholder */}
        <div className="aspect-square rounded-2xl bg-[#F5F0E8] border border-[#E5E0D8] border-dashed flex flex-col items-center justify-center text-[#9CA3AF] hover:bg-[#E5E0D8] transition cursor-pointer">
            <Plus className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">더 보기</span>
        </div>
    </div>
  </div>
);

// --- Main App Component ---

const App = () => {
  const [activePage, setActivePage] = useState('home');

  // 폰트 로딩 깜빡임 방지 (useEffect Injection)
  useEffect(() => {
    const link = document.createElement('link');
    link.href = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case 'gallery': return <GalleryPage setActivePage={setActivePage} />; 
      case 'studio': return <StudioPage />;
      case 'market': return <MarketPage />;
      case 'about': return <AboutPage />;
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="font-sans text-[#2D3142] min-h-screen bg-[#FFF9F0] selection:bg-[#E07A5F]/20 selection:text-[#E07A5F]" style={{ fontFamily: '"Pretendard", sans-serif' }}>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
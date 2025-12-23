import React, { useState, useEffect } from 'react';
import { 
  Camera, ShoppingBag, Scissors, Heart, Menu, X, Star, Image as ImageIcon, Sparkles, Book, 
  Loader2, Globe, ArrowRight, RotateCcw, Info, Upload, Check, Plus, Zap
} from 'lucide-react';

/**
 * JJAJJA (짜짜) - Prototype Version 1.5 (Final Fix)
 * 1. 갤러리 첫 화면: '메모리 드로잉 포스터' 기본 노출
 * 2. 갤러리 배지: '바느질 0%' 오렌지색 배지 삭제
 * 3. 푸터: 데모 버전 라이선스 면책 조항 추가
 * 4. [재수정] 마켓(키트 구매): 제품 사진 태그 완전 삭제 -> DIY 아이콘 대체 확인
 */

// --- 데이터 구조 ---

const CATEGORIES = ['전체', '똥손전용⚡', '상의', '하의', '원피스', '겉옷', '아기옷'];

const STORIES = [
  {
    id: 1,
    type: '겉옷',
    title: "아버지의 양복, 거실의 품격이 되다",
    desc: "30년 간 가족을 위해 입으셨던 아버지의 회색 양복. 차가운 옷장 대신 따뜻한 거실에서 매일 아버지를 기억합니다.",
    originalImage: "/images/IMG_0590.jpg",
    items: [
      { id: '1-3', type: 'Poster', name: "메모리 드로잉 포스터", difficulty: 3, price: "14,900", img: "/images/IMG_0595.jpg", desc: "아버지의 뒷모습을 담은 패브릭 아트" },
      { id: '1-1', type: 'Cushion', name: "클래식 수트 쿠션", difficulty: 1, price: "18,900", img: "/images/IMG_0597.jpg", desc: "앞주머니 디테일을 살린 중후한 멋" },
      { id: '1-2', type: 'Bag', name: "데일리 수트 토트백", difficulty: 2, price: "24,900", img: "/images/IMG_0596.jpg", desc: "라펠 디자인을 그대로 살린 가방" }
    ]
  },
  {
    id: 5,
    type: '상의',
    isNoSew: true,
    title: "하와이안 셔츠의 화려한 외출",
    desc: "휴양지의 설렘이 담긴 하와이안 셔츠. 등판의 화려한 패턴을 살려 주방에 생기를 더하는 앞치마와 소품으로 변신합니다.",
    originalImage: "/images/IMG_0572.jpg", 
    items: [
      { id: '5-1', type: 'Apron', name: "하와이안 노소잉 에이프런", difficulty: 0, price: "19,900", img: "/images/IMG_0578.jpg", desc: "바느질 대신 의류용 접착테이프로 시접을 정리하고 아일렛으로 완성한 앞치마" },
      { id: '5-2', type: 'Pouch', name: "매일 건강식 도시락 보자기 파우치", difficulty: 0, price: "12,900", img: "/images/IMG_0579.jpg", desc: "셔츠 등판을 활용해 매듭으로 완성하는 실용 보자기 파우치" },
      { id: '5-3', type: 'Cushion', name: "트로피컬 포인트 쿠션", difficulty: 0, price: "18,900", img: "/images/IMG_0580.jpg", desc: "셔츠 단추 라인을 디자인 포인트로 살린 힙한 쿠션" }
    ]
  },
  {
    id: 3,
    type: '하의',
    isNoSew: true,
    title: "빈티지 청바지의 힙한 변신",
    desc: "무릎 늘어난 빈티지 데님. 아일렛과 리벳을 만나면 바느질 1도 없이 가장 트렌디한 오브제가 됩니다.",
    originalImage: "/images/IMG_0573.jpg",
    items: [
      { id: '3-1', type: 'Cushion', name: "아일렛 리벳 데님 쿠션", difficulty: 0, price: "19,900", img: "/images/IMG_0586.jpg", desc: "금속 아일렛과 리벳으로 고정하여 와일드한 멋을 살린 쿠션" },
      { id: '3-2', type: 'Bag', name: "샤넬풍 데님 트위드백", difficulty: 1, price: "25,900", img: "/images/IMG_0588.jpg", desc: "데님의 워싱감을 살려 체인과 함께 엮어낸 하이엔드 무드 가방" },
      { id: '3-3', type: 'Poster', name: "데님 소울 태피스트리", difficulty: 3, price: "14,900", img: "/images/IMG_0589.jpg", desc: "청바지의 워싱과 질감을 살린 감각적인 벽걸이" }
    ]
  },
  {
    id: 2,
    type: '원피스',
    isNoSew: true,
    title: "원피스에 담긴 계절의 추억",
    desc: "아끼던 원피스의 화려한 패턴. 바느질 없이도 정성을 담아 솜 공을 만들고 엮어내면 포근한 리스가 완성됩니다.",
    originalImage: "/images/IMG_0582.jpg",
    items: [
      { id: '2-1', type: 'Wreath', name: "추억 담은 솜 공 리스", difficulty: 0, price: "24,900", img: "/images/IMG_0581.jpg", desc: "원단을 잘라 솜을 넣고 철사로 엮어 완성하는 정성 어린 리스" },
      { id: '2-2', type: 'Bag', name: "원피스 레이어드 에코백", difficulty: 2, price: "22,900", img: "/images/IMG_0583.jpg", desc: "치맛단을 활용한 넉넉한 수납력의 감성 에코백" },
      { id: '2-3', type: 'Cushion', name: "컬러블록 포인트 쿠션", difficulty: 1, price: "18,900", img: "/images/IMG_0584.jpg", desc: "원피스의 배색을 활용한 모던 디자인" }
    ]
  },
  {
    id: 4,
    type: '아기옷',
    title: "세상에 처음 나온 날, 배냇저고리",
    desc: "너무 작아져 버린 우리 아이 첫 옷. 액자 속에 고이 담아 우리 아이의 성장을 매일 축하해 주세요.",
    originalImage: "/images/IMG_0574.jpg",
    items: [
      { id: '4-1', type: 'Frame', name: "첫 만남 기록 액자", difficulty: 1, price: "21,900", img: "/images/IMG_0585.jpg", desc: "탄생 정보와 함께 보관하는 우리 아이 추억 프레임" },
      { id: '4-2', type: 'Doll', name: "업사이클링 토끼인형", difficulty: 2, price: "29,900", img: "/images/IMG_0576.jpg", desc: "아이 옷으로 만들어 더 의미 있는 친구" },
      { id: '4-3', type: 'Cushion', name: "소프트 애착 쿠션", difficulty: 1, price: "17,900", img: "/images/IMG_0577.jpg", desc: "배냇저고리 여밈을 살린 포근한 소품" }
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
            <span className="text-xl md:text-2xl font-black tracking-tight text-[#2D3142]">JJAJJA</span>
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
            <span className="text-xl font-bold text-[#F5F0E8]">JJAJJA</span>
          </div>
          
          <div className="max-w-md">
            <h5 className="text-[#E07A5F] font-bold text-sm mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              데모/테스트 버전 - 비상업용
            </h5>
            <p className="text-xs text-[#9CA3AF] font-normal leading-relaxed break-keep">
              본 데모의 일부 이미지는 컨셉 검증용 예시이며, 상용화 시 라이선스 확보 또는 자체 제작 이미지로 교체 예정입니다. 
              권리자 요청 시 즉시 삭제·교체하겠습니다.
            </p>
          </div>

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
        <p className="text-xs font-normal text-[#9CA3AF]">© 2024 JJAJJA. All rights reserved.</p>
        <div className="flex gap-4">
          <Globe className="w-5 h-5 cursor-pointer hover:text-white" />
          <div className="w-5 h-5 bg-[#3E4255] rounded-full cursor-pointer hover:bg-[#4B5563]"></div>
          <div className="w-5 h-5 bg-[#3E4255] rounded-full cursor-pointer hover:bg-[#4B5563]"></div>
        </div>
      </div>
    </div>
  </footer>
);

// --- StoryCard Component ---

const StoryCard = ({ story, setActivePage }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); 
  const currentItem = selectedIndex === -1 ? null : story.items[selectedIndex];
  const displayImage = selectedIndex === -1 ? story.originalImage : currentItem.img;

  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row mb-10 group">
      <div className="w-full md:w-[50%] bg-[#F5F0E8] relative aspect-square md:aspect-auto">
         <img src={displayImage} alt="Display" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" onError={(e) => {e.target.src = 'https://via.placeholder.com/600x600?text=이미지 준비 중'}} />
         <div className="absolute top-6 left-6 flex flex-col gap-2">
            <div className={`backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black tracking-widest ${selectedIndex === -1 ? 'bg-black/80 text-white' : 'bg-white/90 text-slate-800'}`}>
                {selectedIndex === -1 ? 'BEFORE' : 'AFTER'}
            </div>
         </div>
      </div>
      <div className="w-full md:w-[50%] p-10 md:p-14 flex flex-col">
         <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-[#2D3142] mb-4 leading-tight">
                {selectedIndex === -1 ? story.title : currentItem.name}
            </h3>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 font-medium">
                {selectedIndex === -1 ? story.desc : currentItem.desc}
            </p>
         </div>
         <div className="mt-auto">
            <p className="text-[10px] text-slate-400 font-black mb-4 uppercase tracking-[0.2em]">Select Item</p>
            <div className="flex gap-3 mb-10">
                <button onClick={() => setSelectedIndex(-1)} className={`w-16 h-16 rounded-2xl border-2 overflow-hidden transition-all ${selectedIndex === -1 ? 'border-black' : 'border-transparent opacity-40 hover:opacity-100'}`}>
                    <img src={story.originalImage} className="w-full h-full object-cover" />
                </button>
                {story.items.map((item, idx) => (
                    <button key={item.id} onClick={() => setSelectedIndex(idx)} className={`w-16 h-16 rounded-2xl border-2 overflow-hidden transition-all ${selectedIndex === idx ? 'border-orange-500 shadow-lg' : 'border-transparent opacity-40 hover:opacity-100'}`}>
                        <img src={item.img} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
            <div className="flex gap-3">
                <button onClick={() => setActivePage('market')} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black text-sm hover:bg-black transition-colors">키트 구매</button>
                <button onClick={() => setActivePage('studio')} className="flex-1 bg-white border border-slate-200 text-slate-900 py-4 rounded-2xl font-black text-sm hover:bg-slate-50 transition-colors">AI 가이드</button>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Main Pages ---

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
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden px-4 bg-[#FFF9F0]">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6B8E73]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#E07A5F]/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] border border-[#E07A5F]/20 text-xs font-semibold tracking-wide mb-6">
              🌱 추억을 새로운 일상으로
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#2D3142] leading-tight mb-6">
            옷장 속 추억,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] to-[#6B8E73]">
              새로운 오브제로
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#5D5F65] mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
            사진 한 장이면 충분합니다. AI가 디자인을 제안하고, 나만의 제작 키트를 보내드려요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => setActivePage('studio')} className="flex items-center justify-center bg-[#6B8E73] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#55725C] transition shadow-xl hover:shadow-[#6B8E73]/20 transform hover:-translate-y-1">
              <Camera className="w-5 h-5 mr-2" />
              내 옷 변신시키기
            </button>
            <button onClick={() => setActivePage('gallery')} className="flex items-center justify-center bg-white text-[#2D3142] border border-[#2D3142] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#2D3142] hover:text-white transition">
              바느질 없이 시작
            </button>
          </div>

          <div className="md:hidden grid grid-cols-4 gap-3 max-w-sm mx-auto mb-8 px-2">
            <button onClick={() => setActivePage('gallery')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] group-hover:shadow-md transition-all">
                <ImageIcon className="w-6 h-6 text-[#E07A5F]" />
              </div>
              <span className="text-xs font-semibold text-[#5D5F65]">변신 사례</span>
            </button>
            <button onClick={() => setActivePage('studio')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] group-hover:shadow-md transition-all">
                <Sparkles className="w-6 h-6 text-[#6B8E73]" />
              </div>
              <span className="text-xs font-semibold text-[#5D5F65]">무료 체험</span>
            </button>
            <button onClick={() => setActivePage('market')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] group-hover:shadow-md transition-all">
                <ShoppingBag className="w-6 h-6 text-[#E07A5F]" />
              </div>
              <span className="text-xs font-semibold text-[#5D5F65]">키트 구매</span>
            </button>
            <button onClick={() => setActivePage('about')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-[#E5E0D8] flex items-center justify-center group-hover:border-[#E07A5F] group-hover:shadow-md transition-all">
                <Book className="w-6 h-6 text-[#6B8E73]" />
              </div>
              <span className="text-xs font-semibold text-[#5D5F65]">완성 작품</span>
            </button>
          </div>
        </div>

        {/* Hero Slider/Card */}
        <div className="max-w-6xl mx-auto relative z-10 px-2">
            <div className="bg-white rounded-3xl border border-[#E5E0D8] overflow-hidden shadow-xl">
                <div className="grid md:grid-cols-2">
                    <div className="relative h-64 md:h-96">
                        <img src={STORIES[activeStoryIndex].originalImage} className="w-full h-full object-cover" alt="Before" onError={(e) => e.target.src = 'https://via.placeholder.com/800x800?text=No+Image'} />
                        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-bold">BEFORE</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                            <div>
                                <h3 className="text-white text-2xl font-bold mb-2">{STORIES[activeStoryIndex].title}</h3>
                                <p className="text-[#E5E0D8] text-sm font-normal line-clamp-2">{STORIES[activeStoryIndex].desc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-6 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-[#E07A5F] font-bold text-sm tracking-widest uppercase">After Re:Life</span>
                            <div className="flex gap-2">
                                {STORIES.map((_, i) => (
                                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === activeStoryIndex ? 'bg-[#E07A5F] w-6' : 'bg-[#E5E0D8]'}`} />
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {STORIES[activeStoryIndex].items.map((item, idx) => (
                                <div key={idx} className="group cursor-pointer">
                                    <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-[#F5F0E8] relative border border-[#E5E0D8]">
                                        <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => e.target.src = 'https://via.placeholder.com/400x400?text=No+Image'} />
                                    </div>
                                    <p className="text-sm font-bold text-[#2D3142] truncate">{item.name}</p>
                                    <div className="flex gap-0.5 mt-1">
                                        {[...Array(3)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < item.difficulty ? 'text-[#E07A5F] fill-[#E07A5F]' : 'text-[#E5E0D8]'}`} />
                                        ))}
                                    </div>
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
    <div className="pt-24 pb-20 px-4 min-h-screen bg-[#FFF9F0] animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-5xl font-bold text-[#E07A5F] tracking-widest uppercase mb-4">TRANSFORMATION GALLERY</h1>
          <p className="text-[#5D5F65] max-w-2xl mx-auto font-normal text-lg">의류별, 스타일별로 변신 사례를 둘러보세요.</p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-16 flex-wrap">
          {CATEGORIES.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === f 
                  ? 'bg-[#2D3142] text-white shadow-lg scale-105' 
                  : 'bg-white text-[#5D5F65] border border-[#E5E0D8] hover:border-[#2D3142] hover:text-[#2D3142]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Story Grid (Using New Interactive StoryCard) */}
        <div className="space-y-12">
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

// --- MarketPage (Modified: Image Completely Removed & Replaced) ---

const MarketPage = () => {
  const MARKET_ITEMS = [
    { id: 1, name: "클래식 수트 가방 키트", price: "24,900원", tag: "BEST" },
    { id: 2, name: "빈티지 데님 숄더백 키트", price: "25,900원", tag: "HOT" },
    { id: 3, name: "애착 토끼 인형 키트", price: "29,900원", tag: "NEW" },
    { id: 4, name: "체크 셔츠 쿠션 키트", price: "18,900원", tag: "SALE" },
    { id: 5, name: "전문가용 재단 가위", price: "24,500원", tag: "TOOL" },
    { id: 6, name: "오가닉 코튼 봉제실 세트", price: "8,900원", tag: "BASIC" },
    { id: 7, name: "접착 심지 & 시침핀 세트", price: "6,500원", tag: "BASIC" },
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
                      {/* [수정 완료] img 태그 완전히 삭제하고 아이콘 UI로 대체 */}
                      <div className="relative aspect-square bg-[#F5F0E8] flex flex-col items-center justify-center p-6 text-[#A8A29E]">
                          <Scissors className="w-12 h-12 mb-3 opacity-50" />
                          <span className="text-xs font-black tracking-widest border-2 border-[#A8A29E]/30 px-3 py-1 rounded-full opacity-50">DIY KIT</span>
                          
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

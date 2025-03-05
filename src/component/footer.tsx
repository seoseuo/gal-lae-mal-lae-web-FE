'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FooterNav() {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', path: '/', label: '홈',icon: 'home.svg' },
    { id: 'trip', path: '/trip', label: '여행',icon: 'trip.svg' },
    { id: 'document', path: '/document', label: '문서',icon: 'document.svg' },
    { id: 'communication', path: '/communication', label: '소통',icon: '    .svg' },
    { id: 'profile', path: '/profile', label: '프로필',icon: 'profile.svg' }
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              href={item.path} 
              className={`flex flex-col items-center flex-1 ${
                pathname === item.path ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              <div className="w-6 h-6 relative">
                <img
                  src={`${item.icon}`}
                  alt={item.label}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
import './globals.css';
import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-[#eaecee]'>
        <div className='flex h-screen'>
          <div className="bg-[#d5d8dc] w-[13%]  h-screen inline-block relative">
            <Sidebar />
          </div>
          <div className="flex-1 h-screen inline-block relative">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

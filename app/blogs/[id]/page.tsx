'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

// Fetch and parse blog from markdown file
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filename = `${slug}.md`;
    const response = await fetch(`/content/blogs/${filename}`);
    if (!response.ok) return null;
    
    const text = await response.text();
    
    // Parse frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = text.match(frontmatterRegex);
    
    if (!match) return null;
    
    const frontmatter = match[1];
    const content = match[2];
    
    // Extract title and date
    const titleMatch = frontmatter.match(/title:\s*["'](.+)["']/);
    const dateMatch = frontmatter.match(/date:\s*["'](.+)["']/);
    
    return {
      slug,
      title: titleMatch ? titleMatch[1] : 'Untitled',
      date: dateMatch ? dateMatch[1] : '',
      content: content.trim()
    };
  } catch (error) {
    console.error('Error loading blog:', error);
    return null;
  }
}

const Taskbar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-16 bg-[#D4D0C8] border-t-2 border-[#FFFFFF] flex items-center justify-between px-1 sm:px-2 shadow-lg z-40">
      <Link href="/">
        <button className="win2k-button h-16 sm:h-12 px-4 sm:px-5 flex items-center gap-2 font-bold text-lg sm:text-base">
          <img src="/favicon.ico" alt="Windows" className="w-7 h-7 sm:w-6 sm:h-6" />
          <span>Start</span>
        </button>
      </Link>
      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={() => window.open('https://tiktok.com/@aistartupfren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="TikTok"
        >
          🎵 <span className="hidden sm:inline ml-1">TikTok</span>
        </button>
        <button 
          onClick={() => window.open('https://instagram.com/aistartup.fren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="Instagram"
        >
          📷 <span className="hidden sm:inline ml-1">Instagram</span>
        </button>
        <button 
          onClick={() => window.open('https://twitter.com/aistartupfren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="Twitter"
        >
          🐦 <span className="hidden sm:inline ml-1">X</span>
        </button>
        <button 
          onClick={() => window.open('https://www.youtube.com/@aistartupfren', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="YouTube"
        >
          ▶️ <span className="hidden sm:inline ml-1">YouTube</span>
        </button>
        <button 
          onClick={() => window.open('https://xhslink.com/m/77Ve3SZLW0n', '_blank')}
          className="win2k-button h-16 sm:h-12 px-3 sm:px-3 flex items-center text-md sm:text-md hover:bg-gray-300"
          title="Xiaohongshu"
        >
          📕 <span className="hidden sm:inline ml-1">Xiaohongshu</span>
        </button>
        <div className="hidden sm:flex win2k-button h-12 sm:h-12 px-2 sm:px-3 items-center gap-1 sm:gap-2 text-sm sm:text-base">
          <span className="text-base sm:text-md">🕐</span>
          <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default function BlogPost({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(params.id).then(post => {
      setBlog(post);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) {
    return (
      <main className="relative min-h-screen w-full overflow-hidden bg-[#D4D0C8] flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </main>
    );
  }

  if (!blog) {
    notFound();
  }

  // Convert markdown to HTML-like rendering
  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.trim() === '') {
        elements.push(<br key={key++} />);
      } else if (line.startsWith('## ')) {
        // H2 headers
        elements.push(
          <h2 key={key++} className="font-bold text-xl mt-6 mb-3">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        // H3 headers
        elements.push(
          <h3 key={key++} className="font-bold text-lg mt-4 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        // Bullet points
        elements.push(
          <p key={key++} className="ml-4 mb-1">
            {line}
          </p>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // Bold text
        elements.push(
          <p key={key++} className="font-bold italic mt-4">
            {line.replace(/\*\*/g, '')}
          </p>
        );
      } else {
        // Regular paragraphs
        elements.push(
          <p key={key++} className="mb-2">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <main className="relative h-screen w-full bg-[#D4D0C8] flex flex-col overflow-hidden">
      {/* Content wrapper */}
      <div className="relative z-10 flex-1 flex flex-col pb-20 sm:pb-16 overflow-hidden">
        <div className="win2k-window w-full h-full flex flex-col shadow-2xl overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-[#0054E3] to-[#0099E3] text-white px-3 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">📄</span>
              <span className="font-bold text-sm">{blog.title}.doc - Microsoft Word</span>
            </div>
            <div className="flex gap-1">
              <Link href="/blogs">
                <button className="win2k-button px-3 py-1 text-xs font-bold hover:bg-red-500">
                  ✕
                </button>
              </Link>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="bg-[#D4D0C8] border-b border-gray-400 px-2 py-1 flex gap-4 text-xs">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Insert</span>
            <span>Format</span>
            <span>Tools</span>
            <span>Help</span>
          </div>

          {/* Toolbar */}
          <div className="bg-[#D4D0C8] border-b border-gray-400 px-2 py-2 flex gap-2 items-center text-xs flex-wrap">
            <Link href="/blogs">
              <button className="win2k-button px-2 py-1">← Back to Folder</button>
            </Link>
            <button className="win2k-button px-2 py-1">💾 Save</button>
            <button className="win2k-button px-2 py-1">🖨️ Print</button>
            <div className="border-l border-gray-500 h-4 mx-1"></div>
            <button className="win2k-button px-2 py-1">✂️ Cut</button>
            <button className="win2k-button px-2 py-1">📋 Copy</button>
            <button className="win2k-button px-2 py-1">📄 Paste</button>
          </div>

          {/* Document Content */}
          <div className="bg-white p-4 sm:p-8 overflow-auto flex-1">
            <div className="max-w-2xl mx-auto bg-white p-4 sm:p-8" style={{ fontFamily: 'Times New Roman, serif' }}>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center border-b-2 border-gray-300 pb-2">
                {blog.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mb-6 text-center italic">
                Published: {blog.date}
              </p>
              <div className="text-sm sm:text-base leading-relaxed">
                {renderMarkdown(blog.content)}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#D4D0C8] border-t-2 border-white px-3 py-1 text-xs flex justify-between">
            <span>Page 1 of 1</span>
            <span>{blog.title}.doc</span>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </main>
  );
}

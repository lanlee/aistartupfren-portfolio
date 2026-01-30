import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  content: string;
}

interface DesktopIconProps {
  icon: string;
  label: string;
  url: string;
}

// Read blog posts from markdown files
function getBlogPosts(): BlogPost[] {
  const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');
  const fileNames = fs.readdirSync(blogsDirectory);

  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const filePath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Remove .md extension to get slug
      const slug = fileName.replace('.md', '');

      return {
        slug,
        title: data.title,
        date: data.date,
        content: content
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return posts;
}

export default function BlogFolder() {
  const blogPosts = getBlogPosts();
  
  const icons: DesktopIconProps[] = [
    { icon: '💬', label: 'AEO GEO Discord Group', url: 'https://discord.gg/MbYtAf5Ykv' },
    { icon: '📚', label: 'AEO GEO in 48 hrs Guide', url: 'https://www.heyemmett.com/blogs/48-Hour-AI-SEO-AEO-GEO-LLMO-Guide' },
    { icon: '🤝', label: '1:1 Startup Consulting', url: 'https://calendar.app.google/urxPrTA9XQ8W4G1w5' },
    { icon: '🍮', label: 'My Current Startup HeyEmmett', url: 'https://heyemmett.com' },
    { icon: '🖼️', label: 'My Prev Startup Assembo', url: 'https://assembo.ai/' },
    { icon: '✍️', label: 'My Blogs', url: '/blogs' },
    { icon: '📧', label: 'aistartupfren@gmail.com', url: 'mailto:aistartupfren@gmail.com' },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/background.webp)',
        }}
      ></div>
      
      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-3 sm:p-6 md:p-8 pb-24 sm:pb-28">
        <div className="grid grid-cols-2 gap-3 sm:gap-2 md:gap-3 w-fit">
          {icons.map((icon, index) => (
            <DesktopIcon key={index} {...icon} />
          ))}
        </div>
      </div>

      {/* Blog Folder Window */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-8 pt-8 z-30 pointer-events-none">
        <div className="win2k-window w-full max-w-4xl rounded overflow-hidden shadow-2xl pointer-events-auto">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-[#0054E3] to-[#0099E3] text-white px-3 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-xl">📁</span>
              <span className="font-bold text-sm">My Blogs - Windows Explorer</span>
            </div>
            <div className="flex gap-1">
              <Link href="/">
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
            <span>Favorites</span>
            <span>Tools</span>
            <span>Help</span>
          </div>

          {/* Toolbar */}
          <div className="bg-[#D4D0C8] border-b border-gray-400 px-2 py-2 flex gap-2 items-center">
            <Link href="/">
              <button className="win2k-button px-3 py-1 text-xs">← Back</button>
            </Link>
            <button className="win2k-button px-3 py-1 text-xs">→ Forward</button>
            <div className="win2k-button flex-1 px-2 py-1 text-xs bg-white">
              📁 C:\My Documents\Blogs
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white p-4 min-h-[400px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {blogPosts.map((blog) => (
                <Link key={blog.slug} href={`/blogs/${blog.slug}`}>
                  <div
                    className="flex flex-col items-center gap-2 p-2 hover:bg-blue-100 rounded cursor-pointer transition-colors"
                  >
                    <div className="text-6xl">📄</div>
                    <div className="text-xs text-center break-words w-full">
                      {blog.title}.doc
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#D4D0C8] border-t-2 border-white px-3 py-1 text-xs flex justify-between">
            <span>{blogPosts.length} object(s)</span>
            <span>My Computer</span>
          </div>
        </div>
      </div>

      {/* Taskbar */}
      <Taskbar />
    </main>
  );
}


import React from "react";
import { SocialPost } from "../../types";
import { ExternalLink } from "lucide-react";

interface SocialUpdatesSectionProps {
  socialPosts: SocialPost[];
}

export const SocialUpdatesSection: React.FC<SocialUpdatesSectionProps> = ({
  socialPosts,
}) => {
  const socialChannels = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61595953122898",
    },
    { name: "Instagram", url: "https://www.instagram.com/anrfkuc/" },
    { name: "YouTube", url: "https://www.youtube.com/@ANRFKUC" },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading, Description & Social Platform Buttons */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">
              Follow project updates
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Announcements are posted on our social channels first. Posts
              appear here automatically.
            </p>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-2.5 pt-3">
              {socialChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-white border border-slate-700 hover:border-slate-900 text-slate-800 text-sm font-medium rounded-md hover:bg-slate-50 transition shadow-2xs"
                >
                  {channel.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: 2 Social Post Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {socialPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 min-h-40"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                    <span className="font-semibold text-slate-600">
                      {post.author}
                    </span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {post.content}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-slate-400">
                  <span className="capitalize font-medium text-slate-500">
                    via {post.platform}
                  </span>
                  <ExternalLink size={13} className="text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

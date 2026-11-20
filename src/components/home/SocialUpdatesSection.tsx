import React from "react";
import { ExternalLink } from "lucide-react";

export const SocialUpdatesSection: React.FC = () => {
  const socialChannels = [
    {
      name: "Facebook",
      handle: "ANRF-PAIR Kannur University",
      description: "Event photos, symposium updates, and community outreach.",
      url: "https://www.facebook.com/profile.php?id=61595953122898",
    },
    {
      name: "Instagram",
      handle: "@anrfkuc",
      description: "Lab highlights, research milestones, and campus moments.",
      url: "https://www.instagram.com/anrfkuc/",
    },
    {
      name: "YouTube",
      handle: "@ANRFKUC",
      description: "Recorded seminars, talks, and project overview sessions.",
      url: "https://www.youtube.com/@ANRFKUC",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-8 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0b2344] font-display">
              Follow project updates
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Stay connected with our research milestones, seminars, and
              announcements across our official social channels.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {socialChannels.map((channel) => (
              <a
                key={channel.name}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-slate-200 rounded-lg p-5 shadow-xs hover:shadow-md hover:border-[#0f766e] transition-all duration-200 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-[#0b2344] group-hover:text-[#0f766e] transition font-display">
                      {channel.name}
                    </span>
                    <ExternalLink
                      size={14}
                      className="text-slate-400 group-hover:text-[#0f766e] transition"
                    />
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {channel.handle}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {channel.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f766e] hover:text-[#0b2344] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0b2344] font-display">
          Contact Us
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Connect with the Kannur University ANRF-PAIR Project Directorate and research personnel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs space-y-6">
            <h2 className="text-xl font-bold text-[#0b2344] font-display">
              Spoke Office Location
            </h2>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="text-[#0f766e] shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-slate-900">Kannur University</div>
                  <div className="text-slate-600 leading-relaxed">
                    ANRF-PAIR Spoke Directorate<br />
                    Thavakkara, Civil Station P.O.<br />
                    Kannur, Kerala 670002, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="text-[#0f766e] shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-slate-900">Email Inquiries</div>
                  <div className="text-slate-600">
                    pair-hub@kannuruniv.ac.in<br />
                    coordinator.pair@kannuruniv.ac.in
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="text-[#0f766e] shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-slate-900">Phone & Helpline</div>
                  <div className="text-slate-600">
                    +91 497 2715185 / 2715200<br />
                    Monday – Friday, 9:30 AM – 5:00 PM IST
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl font-bold text-[#0b2344] font-display mb-6">
              Send a Query
            </h2>

            {submitted ? (
              <div className="p-8 bg-teal-50 border border-teal-200 rounded-md text-center space-y-3">
                <CheckCircle2 size={36} className="text-[#0f766e] mx-auto" />
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Message Transmitted
                </h3>
                <p className="text-sm text-slate-600">
                  Thank you for reaching out. A coordinator from the ANRF-PAIR office will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-semibold text-[#0f766e] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. / Mr. / Ms."
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@institution.edu"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Subject / Department Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Research Collaboration / Facility Access"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your inquiry or proposal summary here..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0b2344] hover:bg-[#071930] text-white font-medium text-sm rounded-md transition shadow-xs flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


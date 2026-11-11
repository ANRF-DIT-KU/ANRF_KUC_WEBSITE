import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageContainer } from "../components/common/PageContainer";
import { PageHeader } from "../components/common/PageHeader";
import { BackLink } from "../components/common/BackLink";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { createContactQueryApi, fetchTeamsApi } from "../api";
import { GENERAL_PROJECT } from "../types";

const emptyForm = {
  name: "",
  email: "",
  projectId: GENERAL_PROJECT,
  subject: "",
  message: "",
};

export const ContactPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeamsApi,
  });

  const submitMutation = useMutation({
    mutationFn: () => createContactQueryApi(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queries"] });
      setFormData(emptyForm);
      setSubmitted(true);
    },
    onError: () => {
      setError("Sorry, your message could not be sent. Please try again or email us directly.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    submitMutation.mutate();
  };

  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />

      <PageHeader title="Contact Us" />

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
                  <div className="font-bold text-slate-900">
                    Kannur University
                  </div>
                  <div className="text-slate-600 leading-relaxed">
                    Thavakkara, Civil Station P.O.
                    <br />
                    Kannur, Kerala 670002, India
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="text-[#0f766e] shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-slate-900">
                    Email Inquiries
                  </div>
                  <a
                    href="mailto:anrfpair@kannuruniv.ac.in"
                    className="text-slate-600"
                  >
                    anrfpair@kannuruniv.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="text-[#0f766e] shrink-0 mt-1" size={20} />
                <div>
                  <div className="font-bold text-slate-900">
                    Phone & Helpline
                  </div>
                  <div className="text-slate-600">
                    +91 497 2715185 / 2715200
                    <br />
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
                  Thank you for reaching out. A coordinator from the ANRF-PAIR
                  office will respond shortly.
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
                {error && (
                  <div className="border border-red-200 bg-red-50 text-red-800 rounded-md px-4 py-3 text-sm">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@institution.edu"
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Related Project
                  </label>
                  <select
                    value={formData.projectId}
                    onChange={(e) =>
                      setFormData({ ...formData, projectId: e.target.value })
                    }
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                  >
                    <option value={GENERAL_PROJECT}>General enquiry (all projects)</option>
                    {teams.map((t) => (
                      <option key={t.projectId} value={t.projectId}>
                        {t.pi.name} –{" "}
                        {t.projectTitle.length > 70
                          ? `${t.projectTitle.slice(0, 70)}…`
                          : t.projectTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Subject / Department Reference
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your inquiry or proposal summary here..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-[#0b2344] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#0b2344] hover:bg-[#071930] text-white font-medium text-sm rounded-md transition shadow-xs flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Send size={15} />
                  <span>{submitMutation.isPending ? "Sending…" : "Send Message"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

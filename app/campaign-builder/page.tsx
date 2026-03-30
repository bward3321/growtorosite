"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "ai" | "user";
  content: string;
  pills?: string[];
  campaignCard?: boolean;
}

const STEPS = [
  "Your Business",
  "Target Audience",
  "Campaign Goal",
  "Channel Strategy",
  "Your Campaign",
  "Launch",
];

const AUDIENCE_PILLS = [
  "B2B Decision Makers",
  "Small Business Owners",
  "Enterprise / C-Suite",
  "Agencies & Consultants",
];

const GOAL_PILLS = [
  "More Leads",
  "Booked Appointments",
  "Newsletter Subscribers",
  "Direct Sales",
];

const CHANNEL_PILLS = [
  "Cold Email",
  "LinkedIn DMs",
  "Social DMs",
  "All Channels",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-3 px-4">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-blue-400"
          style={{
            animation: `bounce-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function CampaignCard({ businessDesc, audience, goal, channel }: { businessDesc: string; audience: string; goal: string; channel: string }) {
  return (
    <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-6 mt-3 space-y-6">
      {/* Market Intelligence */}
      <div>
        <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">Market Intelligence</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Total Addressable Market", value: "14,200" },
            { label: "Verified Emails", value: "8,750" },
            { label: "Est. Reply Rate", value: "3.2%" },
            { label: "Expected Replies/mo", value: "~280" },
          ].map((s) => (
            <div key={s.label} className="bg-[#0a0a0a] rounded-lg p-3 border border-[#222]">
              <div className="text-cyan font-mono text-lg font-bold">{s.value}</div>
              <div className="text-[#666] text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Sequence */}
      <div>
        <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wider">Email Sequence (4 Touches)</h4>
        <div className="space-y-3">
          {[
            { day: "Day 1", type: "Initial Outreach", preview: `Hi {{firstName}}, I noticed your company is in the ${audience?.toLowerCase() || "B2B"} space. We help companies like yours ${goal?.toLowerCase() || "generate more leads"} using ${channel?.toLowerCase() || "cold email"}. Would you be open to a quick conversation?` },
            { day: "Day 3", type: "Value Add", preview: `{{firstName}}, wanted to share a quick case study — we helped a similar company generate 150+ partnerships in 90 days. Thought this might be relevant to what you're building.` },
            { day: "Day 6", type: "Social Proof", preview: `Hi {{firstName}}, our clients have generated $250M+ in revenue through our outbound systems. We're currently running 150+ active campaigns across 23 industries. Happy to show you what's working.` },
            { day: "Day 10", type: "Breakup", preview: `{{firstName}}, I'll keep this short — if outbound growth isn't a priority right now, no worries at all. But if you'd ever like to see how we fill pipelines on autopilot, the door's always open.` },
          ].map((e) => (
            <div key={e.day} className="bg-[#0a0a0a] rounded-lg p-4 border border-[#222]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan font-mono text-xs font-bold">{e.day}</span>
                <span className="text-[#666] text-xs">— {e.type}</span>
              </div>
              <p className="text-[#999] text-sm leading-relaxed">{e.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Strategy */}
      <div>
        <h4 className="text-sm font-semibold text-blue-400 mb-2 uppercase tracking-wider">Recommended Strategy</h4>
        <p className="text-[#999] text-sm leading-relaxed">
          Based on your {businessDesc ? "business" : "profile"} targeting {audience || "B2B decision makers"}, we recommend a {channel?.toLowerCase() || "multi-channel"} approach focused on {goal?.toLowerCase() || "lead generation"}. With a TAM of 14,200 and verified contact data for 8,750 prospects, we project approximately 280 qualified replies per month at a 3.2% engagement rate.
        </p>
      </div>

      {/* Launch buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <a
          href="https://leads.growtoro.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg border border-[#333] text-[#ccc] text-sm font-semibold hover:border-blue-400 hover:text-white transition-all text-center"
        >
          Launch It Myself
        </a>
        <a
          href="https://calendly.com/growtoro/discovery-chat"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-lg bg-cyan text-black text-sm font-semibold hover:bg-cyan/90 transition-all text-center"
        >
          Launch It For Me
        </a>
      </div>
    </div>
  );
}

export default function CampaignBuilder() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [businessDesc, setBusinessDesc] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [channel, setChannel] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  // Initial AI message
  useEffect(() => {
    const timer = setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setMessages([
          {
            role: "ai",
            content:
              "Hey — I'm Growtoro's AI. I build lead generation campaigns in about 90 seconds. Tell me what your company does, and I'll show you exactly how we'd fill your pipeline. What do you sell?",
          },
        ]);
        setTyping(false);
        setStep(1);
      }, 1500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const addAiMessage = (msg: Message, delay = 1200 + Math.random() * 600) => {
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, msg]);
      setTyping(false);
    }, delay);
  };

  const handleSend = (text?: string) => {
    const value = text || input.trim();
    if (!value) return;

    const userMsg: Message = { role: "user", content: value };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    if (step === 1) {
      setBusinessDesc(value);
      setStep(2);
      addAiMessage({
        role: "ai",
        content: `Great — got it. Now, who's your ideal customer? Pick one or describe them:`,
        pills: AUDIENCE_PILLS,
      });
    } else if (step === 2) {
      setAudience(value);
      setStep(3);
      addAiMessage({
        role: "ai",
        content: `Perfect. And what's the primary goal for this campaign?`,
        pills: GOAL_PILLS,
      });
    } else if (step === 3) {
      setGoal(value);
      setStep(4);
      addAiMessage({
        role: "ai",
        content: `Almost there. Which channel do you want to use?`,
        pills: CHANNEL_PILLS,
      });
    } else if (step === 4) {
      setChannel(value);
      setStep(5);
      setTyping(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "Building your campaign...",
          },
        ]);
        setTyping(false);
        setTimeout(() => {
          setStep(6);
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: "Here's your custom campaign:",
              campaignCard: true,
            },
          ]);
        }, 2000);
      }, 1500);
    }
  };

  const handlePillClick = (pill: string) => {
    handleSend(pill);
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-[#0f0f0f] border-r border-[#1a1a1a] p-6">
        <div className="mb-8">
          <span className="text-lg font-bold">
            Grow<span className="text-cyan">toro</span>
          </span>
          <div className="text-[#666] text-xs mt-1">Campaign Builder</div>
        </div>

        {/* Steps */}
        <div className="flex-1 space-y-1">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                i + 1 <= step
                  ? "text-white bg-[#1a1a1a]"
                  : "text-[#444]"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  i + 1 < step
                    ? "bg-green text-black"
                    : i + 1 === step
                    ? "bg-cyan text-black"
                    : "bg-[#222] text-[#555]"
                }`}
              >
                {i + 1 < step ? "✓" : i + 1}
              </span>
              {s}
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="space-y-2 pt-6 border-t border-[#1a1a1a]">
          <a href="/#missions" className="block text-[#555] text-xs hover:text-[#888] transition-colors">
            Case Studies
          </a>
          <a href="/#stations" className="block text-[#555] text-xs hover:text-[#888] transition-colors">
            Pricing
          </a>
          <a href="/" className="block text-[#555] text-xs hover:text-[#888] transition-colors">
            About Growtoro
          </a>
        </div>
      </aside>

      {/* Main chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center gap-3 px-6 py-4 border-b border-[#1a1a1a]">
          <span className="w-2.5 h-2.5 rounded-full bg-green" style={{ animation: "pulse-dot 2s infinite" }} />
          <span className="text-sm font-medium">Growtoro AI — Campaign Builder</span>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`text-xs font-semibold ${
                    msg.role === "ai" ? "text-blue-400" : "text-green"
                  }`}
                >
                  {msg.role === "ai" ? "Growtoro AI" : "You"}
                </span>
              </div>
              <div
                className={`text-sm leading-relaxed ${
                  msg.role === "ai" ? "text-[#ccc]" : "text-white"
                }`}
              >
                {msg.content}
              </div>

              {/* Pills */}
              {msg.pills && step === (msg.pills === AUDIENCE_PILLS ? 2 : msg.pills === GOAL_PILLS ? 3 : 4) && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.pills.map((pill) => (
                    <button
                      key={pill}
                      onClick={() => handlePillClick(pill)}
                      className="px-4 py-2 rounded-full border border-[#333] text-[#aaa] text-sm hover:border-blue-400 hover:text-white hover:bg-blue-400/10 transition-all hover:-translate-y-0.5"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              )}

              {/* Campaign card */}
              {msg.campaignCard && (
                <CampaignCard
                  businessDesc={businessDesc}
                  audience={audience}
                  goal={goal}
                  channel={channel}
                />
              )}
            </div>
          ))}

          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 pb-6">
          <div className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl px-4 py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={step >= 5 ? "Campaign complete!" : "Type your response..."}
              disabled={step >= 5}
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-[#444] disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={step >= 5 || !input.trim()}
              className="px-4 py-1.5 bg-cyan text-black rounded-lg text-sm font-semibold hover:bg-cyan/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

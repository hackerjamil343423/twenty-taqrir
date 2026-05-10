"use client";

import { useEffect, useState } from "react";

type TeamMember = {
  id: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  joinedAt: string;
  user: { name: string | null; email: string };
};

type Team = {
  id: string;
  name: string;
  schoolName: string;
  members: TeamMember[];
};

const roleLabels = { ADMIN: "مدير", EDITOR: "محرر", VIEWER: "مشاهد" };

export default function TeamPage() {
  const [team, setTeam] = useState<Team | null>(null);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("EDITOR");
  const [showInviteModal, setShowInviteModal] = useState(false);

  const loadTeam = () => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setTeam(data.team || null));
  };

  useEffect(loadTeam, []);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    const response = await fetch("/api/team/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
    });
    if (response.ok) {
      setInviteEmail("");
      setShowInviteModal(false);
      loadTeam();
    }
  };

  const handleRoleChange = async (id: string, role: string) => {
    const response = await fetch(`/api/team/members/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    if (response.ok) loadTeam();
  };

  const handleRemove = async (id: string) => {
    const response = await fetch(`/api/team/members/${id}`, { method: "DELETE" });
    if (response.ok) loadTeam();
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-arabic text-2xl font-bold text-midnight-ink">فريق العمل</h1>
          <p className="text-gunmetal-gray text-sm mt-1">{team ? `${team.members.length} أعضاء في ${team.schoolName}` : "جاري التحميل..."}</p>
        </div>
        <button onClick={() => setShowInviteModal(true)} className="px-6 py-3 bg-action-black text-canvas-white rounded-[160px] text-sm font-medium hover:bg-midnight-ink">
          + دعوة عضو
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Metric label="إجمالي الأعضاء" value={String(team?.members.length ?? 0)} />
        <Metric label="المديرون" value={String(team?.members.filter((m) => m.role === "ADMIN").length ?? 0)} />
        <Metric label="المحررون" value={String(team?.members.filter((m) => m.role === "EDITOR").length ?? 0)} />
        <Metric label="المشاهدون" value={String(team?.members.filter((m) => m.role === "VIEWER").length ?? 0)} />
      </div>

      <div className="bg-off-white-sage rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-soft-concrete">
          <h2 className="font-arabic text-lg font-semibold text-midnight-ink">أعضاء الفريق</h2>
        </div>
        <div className="divide-y divide-soft-concrete">
          {team?.members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-6 hover:bg-faded-stone/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-highlight-orange rounded-full flex items-center justify-center text-canvas-white font-bold text-lg">
                  {(member.user.name || member.user.email).charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-midnight-ink">{member.user.name || member.user.email}</div>
                  <div className="text-sm text-gunmetal-gray">{member.user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs px-3 py-1 rounded-full bg-canvas-white text-gunmetal-gray">{roleLabels[member.role]}</span>
                <select value={member.role} onChange={(e) => handleRoleChange(member.id, e.target.value)} className="px-3 py-1.5 bg-canvas-white border border-soft-concrete rounded-[160px] text-sm text-midnight-ink focus:outline-none focus:border-highlight-orange">
                  <option value="ADMIN">مدير</option>
                  <option value="EDITOR">محرر</option>
                  <option value="VIEWER">مشاهد</option>
                </select>
                <button onClick={() => handleRemove(member.id)} className="px-3 py-1.5 text-xs text-red-500 border border-red-200 rounded-[160px] hover:bg-red-50">
                  إزالة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-canvas-white rounded-[32px] p-8 w-full max-w-md">
            <h3 className="font-arabic text-xl font-bold text-midnight-ink mb-6">دعوة عضو جديد</h3>
            <div className="space-y-4">
              <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="teacher@school.edu.sa" className="w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink placeholder:text-gunmetal-gray/50 focus:outline-none focus:border-highlight-orange" />
              <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value as TeamMember["role"])} className="w-full px-5 py-3 bg-off-white-sage border border-soft-concrete rounded-[20px] text-midnight-ink focus:outline-none focus:border-highlight-orange">
                <option value="EDITOR">محرر</option>
                <option value="VIEWER">مشاهد</option>
                <option value="ADMIN">مدير</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleInvite} className="flex-1 py-3 bg-action-black text-canvas-white rounded-[160px] font-medium hover:bg-midnight-ink">إرسال الدعوة</button>
              <button onClick={() => setShowInviteModal(false)} className="px-6 py-3 text-gunmetal-gray border border-soft-concrete rounded-[160px] hover:bg-faded-stone">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-off-white-sage rounded-[20px] p-6 text-center">
      <div className="font-arabic text-3xl font-bold text-midnight-ink">{value}</div>
      <div className="text-sm text-gunmetal-gray">{label}</div>
    </div>
  );
}

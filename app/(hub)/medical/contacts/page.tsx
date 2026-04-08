"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PageIntro, SoftCard, SectionTitle } from "@/components/hub";
import { getEmergencyContactsStore, saveEmergencyContactsStore } from "@/lib/demo-store";
import { EmergencyContact, EmergencyContactGroup } from "@/lib/types";

function emptyContact(group: EmergencyContactGroup): EmergencyContact {
  return {
    id: `${group}-${Math.floor(1000 + Math.random() * 9000)}`,
    name: "",
    relationship: group === "roommate" ? "Roommate" : "Friend",
    phone: "",
    note: "",
    group
  };
}

export default function EmergencyContactsPage() {
  const router = useRouter();
  const [contacts, setContacts] = useState(getEmergencyContactsStore());
  const [editingId, setEditingId] = useState<string | null>(null);
  const grouped = useMemo(() => ({
    roommate: contacts.filter((contact) => contact.group === "roommate"),
    friend: contacts.filter((contact) => contact.group === "friend")
  }), [contacts]);

  function updateContact(id: string, key: keyof EmergencyContact, value: string) {
    setContacts((current) => current.map((contact) => (contact.id === id ? { ...contact, [key]: value } : contact)));
  }

  function addContact(group: EmergencyContactGroup) {
    const next = emptyContact(group);
    setContacts((current) => [...current, next]);
    setEditingId(next.id);
  }

  function deleteContact(id: string) {
    setContacts((current) => current.filter((contact) => contact.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function renderGroup(group: EmergencyContactGroup, title: string, subtitle: string) {
    const items = grouped[group];

    return (
      <SoftCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SectionTitle title={title} subtitle={subtitle} />
          <button className="secondary-btn" type="button" onClick={() => addContact(group)}>{group === "roommate" ? "Add Roommate" : "Add Friend"}</button>
        </div>
        <div className="space-y-4">
          {items.map((contact) => {
            const isEditing = editingId === contact.id || (!contact.name && !contact.phone);

            return (
              <div key={contact.id} className="grid gap-4 rounded-[24px] border border-slate-200 p-4 lg:grid-cols-2">
                <div><label className="label">Name</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={contact.name} onChange={(e) => updateContact(contact.id, "name", e.target.value)} /></div>
                <div><label className="label">Relationship Type</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={contact.relationship} onChange={(e) => updateContact(contact.id, "relationship", e.target.value)} /></div>
                <div><label className="label">Phone Number</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={contact.phone} onChange={(e) => updateContact(contact.id, "phone", e.target.value)} /></div>
                <div><label className="label">Optional Note</label><input disabled={!isEditing} className="field disabled:bg-slate-50" value={contact.note ?? ""} onChange={(e) => updateContact(contact.id, "note", e.target.value)} /></div>
                <div className="flex flex-wrap gap-3 lg:col-span-2">
                  <button className="secondary-btn" type="button" onClick={() => setEditingId(contact.id)}>{isEditing ? "Editing" : "Edit"}</button>
                  <button className="ghost-btn" type="button" onClick={() => deleteContact(contact.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </SoftCard>
    );
  }

  return (
    <div className="space-y-6">
      <PageIntro title="Emergency Contacts" description="Save roommates and friends separately so dispatch can quickly reach the right people during a medical emergency." backHref="/medical" />
      <div className="grid gap-6 xl:grid-cols-2">
        {renderGroup("roommate", "Roommates", "Keep the people who share your dorm or immediate room access easy to contact.")}
        {renderGroup("friend", "Friends", "Save close friends who should be notified if you need support on campus.")}
      </div>
      <SoftCard>
        <div className="flex flex-wrap gap-3">
          <button className="primary-btn" type="button" onClick={() => { saveEmergencyContactsStore(contacts); setEditingId(null); }}>Save</button>
          <button className="secondary-btn" type="button" onClick={() => router.push("/medical")}>Back</button>
        </div>
      </SoftCard>
    </div>
  );
}
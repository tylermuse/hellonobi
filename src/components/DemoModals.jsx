import React from "react";
import Button from "./Button";

export function RequestDemoModal({ open, onClose }) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    botcheck: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const accessKey = "c7a3fd79-0e4f-47ce-aa30-c141616d21e3";

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("subject", "Demo Request — hellonobi.com");
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("company", form.company);
      formData.append("role", form.role);
      formData.append("message", form.message);
      formData.append("botcheck", form.botcheck);

      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const j = await r.json();
      if (!r.ok || !j.success) throw new Error(j.message || "Something went wrong.");
      setDone(true);
    } catch (err) {
      setError(err.message || "Failed to submit.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 shadow-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-black dark:text-white">Request a Demo</h2>
          <button onClick={onClose} className="text-black/40 dark:text-white/40 hover:opacity-80 text-xl leading-none">
            ✕
          </button>
        </div>

        {!done ? (
          <form onSubmit={submit} className="space-y-4">
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" value={form.botcheck} onChange={update} />

            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1">Name</label>
              <input name="name" required value={form.name} onChange={update} className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1">Email</label>
              <input name="email" type="email" required value={form.email} onChange={update} className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1">Company</label>
              <input name="company" required value={form.company} onChange={update} className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1">Role</label>
              <input name="role" value={form.role} onChange={update} placeholder="e.g. VP of Sales, Branch Manager" className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1">Message (optional)</label>
              <textarea name="message" rows={3} value={form.message} onChange={update} className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-sm text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20 resize-none" />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? "Sending…" : "Request Demo"}
              </Button>
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <p className="text-base text-black/80 dark:text-white/80">
              Thanks! We'll reach out within 24 hours to set up a demo.
            </p>
            <Button className="mt-6" onClick={onClose}>Close</Button>
          </div>
        )}
      </div>
    </div>
  );
}

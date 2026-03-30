export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-text-muted text-sm">
          © 2026 Growtoro. All systems operational.
        </span>
        <div className="flex items-center gap-6">
          <a href="#" className="text-text-muted text-sm hover:text-text-dim transition-colors">
            Privacy
          </a>
          <a href="#" className="text-text-muted text-sm hover:text-text-dim transition-colors">
            Terms
          </a>
          <a href="mailto:brendan@growtoro.com" className="text-text-muted text-sm hover:text-text-dim transition-colors">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

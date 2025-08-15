export function Footer() {
  return (
    <footer className="text-center space-y-8 lg:space-y-4">
      <p className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        &copy; {new Date().getUTCFullYear()} Anand Chowdhary
      </p>
      <div className="flex flex-wrap gap-2.5 lg:gap-4 justify-center text-sm">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/archive">Archive</a>
        <a href="/life">Life</a>
        <a href="/blog">Blog</a>
        <a href="/events">Events</a>
        <a href="/projects">Projects</a>
        <a href="/mentoring">Mentoring</a>
        <a href="/press">Press</a>
        <a href="/videos">Videos</a>
        <a href="/versions">Versions</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="flex flex-wrap gap-2.5 lg:gap-4 justify-center text-sm">
        <a href="/archive/2009">2009</a>
        <a href="/archive/2010">2010</a>
        <a href="/archive/2011">2011</a>
        <a href="/archive/2012">2012</a>
        <a href="/archive/2013">2013</a>
        <a href="/archive/2014">2014</a>
        <a href="/archive/2015">2015</a>
        <a href="/archive/2016">2016</a>
        <a href="/archive/2017">2017</a>
        <a href="/archive/2018">2018</a>
        <a href="/archive/2019">2019</a>
        <a href="/archive/2020">2020</a>
        <a href="/archive/2021">2021</a>
        <a href="/archive/2022">2022</a>
        <a href="/archive/2023">2023</a>
        <a href="/archive/2024">2024</a>
        <a href="/archive/2025">2025</a>
      </div>
    </footer>
  );
}

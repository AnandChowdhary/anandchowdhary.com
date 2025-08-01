export function Footer() {
  return (
    <footer className="text-center space-y-8 lg:space-y-4">
      <p className="text-xs uppercase font-medium font-mono tracking-wider text-neutral-500">
        &copy; {new Date().getFullYear()} Anand Chowdhary
      </p>
      <div className="flex flex-wrap gap-2.5 lg:gap-4 justify-center text-sm">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Archive</a>
        <a href="#">Life</a>
        <a href="#">Blog</a>
        <a href="#">Events</a>
        <a href="#">Projects</a>
        <a href="#">Mentoring</a>
        <a href="#">Press</a>
        <a href="#">Videos</a>
        <a href="#">Versions</a>
        <a href="#">Contact</a>
      </div>
      <div className="flex flex-wrap gap-2.5 lg:gap-4 justify-center text-sm">
        <a href="#">2009</a>
        <a href="#">2010</a>
        <a href="#">2011</a>
        <a href="#">2012</a>
        <a href="#">2013</a>
        <a href="#">2014</a>
        <a href="#">2015</a>
        <a href="#">2016</a>
        <a href="#">2017</a>
        <a href="#">2018</a>
        <a href="#">2019</a>
        <a href="#">2020</a>
        <a href="#">2021</a>
        <a href="#">2022</a>
        <a href="#">2023</a>
        <a href="#">2024</a>
        <a href="#">2025</a>
      </div>
    </footer>
  );
}

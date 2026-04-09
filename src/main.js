
// new

      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches),
      );
     // create function with darkmode
    function DarkMode(){
        window.location.reload();
        document.documentElement.classList.add="dark";
        localStorage.theme="dark";
    }

     // create function with lightmode
    function LightMode(){
        window.location.reload();
        document.documentElement.classList.remove="dark";
        localStorage.theme="light";
    }
 //  Dark Light Mode Toggle
        function toggleTheme() {
            const html = document.documentElement;
            const isDark = html.classList.contains('dark');

            if (isDark) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }

            updateIcon();
        }

        function updateIcon() {
            const isDark = document.documentElement.classList.contains('dark');
            const sun = document.getElementById('icon-sun');
            const moon = document.getElementById('icon-moon');

            if (isDark) {
                // Dark mode  
                sun.classList.remove('hidden');
                moon.classList.add('hidden');
            } else {
                // Light mode  
                sun.classList.add('hidden');
                moon.classList.remove('hidden');
            }
        }

        
        updateIcon();

        //  Mobile Menu Toggle 
        const menuBtn = document.getElementById('menubutton');
        const navMenu = document.getElementById('nav-menu');

        menuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Toggle icon between menu and close
            const icon = menuBtn.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'ri-close-line';
            } else {
                icon.className = 'ri-menu-line';
            }
        });

        // Close menu mobile
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                menuBtn.querySelector('i').className = 'ri-menu-line';
            });
        });

        // ─── Navbar scroll effect 
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('bg-sky-950/90', 'shadow-lg');
            } else {
                navbar.classList.remove('bg-sky-950/90', 'shadow-lg');
            }
        });


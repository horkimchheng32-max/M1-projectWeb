
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

        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('hidden');
                const icon = menuBtn.querySelector('i');
                if (!navMenu.classList.contains('hidden')) {
                    icon.className = 'ri-close-line';
                } else {
                    icon.className = 'ri-menu-line';
                }
            });

            // Close menu on mobile link click
            navMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.add('hidden');
                    const icon = menuBtn.querySelector('i');
                    if (icon) icon.className = 'ri-menu-line';
                });
            });
        }

       
      


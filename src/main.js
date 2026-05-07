
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

        /* ── search bar state ── */
        var openDrop = null;
        var counts   = { adults: 1, children: 0, infants: 0 };
        var calYear, calMonth, selectedDate = null;

        function toggleDropdown(name) {
            if (openDrop === name) { closeDrop(name); return; }
            if (openDrop) closeDrop(openDrop);
            openDrop = name;
            var panel = document.getElementById('drop-' + name);
            var arrow = document.getElementById('arrow-' + name);
            panel.style.display = 'block';
            arrow.textContent = '▴';
            if (name === 'date') {
                var now = new Date();
                calYear  = calYear  || now.getFullYear();
                calMonth = calMonth !== undefined ? calMonth : now.getMonth();
                renderCalendar();
            }
        }

        function closeDrop(name) {
            var panel = document.getElementById('drop-' + name);
            var arrow = document.getElementById('arrow-' + name);
            if (panel) panel.style.display = 'none';
            if (arrow) arrow.textContent = '▾';
            openDrop = null;
        }

        document.addEventListener('click', function(e) {
            if (!openDrop) return;
            var field = document.getElementById('field-' + openDrop);
            if (field && !field.contains(e.target)) closeDrop(openDrop);
        });

        function selectOption(field, value) {
            document.getElementById('label-' + field).textContent = value;
            closeDrop(field);
        }

        function changeCount(type, delta) {
            var min = (type === 'adults') ? 1 : 0;
            counts[type] = Math.max(min, counts[type] + delta);
            document.getElementById('count-' + type).textContent = counts[type];
        }

        function confirmPeople() {
            var parts = [];
            if (counts.adults)   parts.push(counts.adults   + ' Adult'  + (counts.adults   > 1 ? 's' : ''));
            if (counts.children) parts.push(counts.children + ' Child'  + (counts.children > 1 ? 'ren' : ''));
            if (counts.infants)  parts.push(counts.infants  + ' Infant' + (counts.infants  > 1 ? 's' : ''));
            document.getElementById('label-people').textContent = parts.join(', ') || '1 Adult';
            closeDrop('people');
        }

        var MONTHS = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December'];

        function changeMonth(delta) {
            calMonth += delta;
            if (calMonth > 11) { calMonth = 0;  calYear++; }
            if (calMonth < 0)  { calMonth = 11; calYear--; }
            renderCalendar();
        }

        function renderCalendar() {
            document.getElementById('cal-month-label').textContent = MONTHS[calMonth] + ' ' + calYear;
            var container = document.getElementById('cal-days');
            container.innerHTML = '';
            var today       = new Date();
            var firstDay    = new Date(calYear, calMonth, 1).getDay();
            var daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
            for (var i = 0; i < firstDay; i++) {
                var empty = document.createElement('div');
                empty.className = 'cal-day empty';
                container.appendChild(empty);
            }
            for (var d = 1; d <= daysInMonth; d++) {
                var cell     = document.createElement('div');
                cell.className = 'cal-day';
                cell.textContent = d;
                var thisDate = new Date(calYear, calMonth, d);
                var isToday  = (d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear());
                var isPast   = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                if (isPast)  cell.classList.add('past');
                if (isToday) cell.classList.add('today');
                if (selectedDate && selectedDate.d === d && selectedDate.m === calMonth && selectedDate.y === calYear) {
                    cell.classList.add('selected');
                }
                if (!isPast) {
                    (function(day, month, year) {
                        cell.addEventListener('click', function() {
                            selectedDate = { d: day, m: month, y: year };
                            var label = MONTHS[month].slice(0,3) + ' ' + day + ', ' + year;
                            document.getElementById('label-date').textContent = label;
                            closeDrop('date');
                        });
                    })(d, calMonth, calYear);
                }
                container.appendChild(cell);
            }
        }

        /* ── scroll-aware navbar ── */
        var navbar = document.getElementById('navbar');
        function updateNavbar() {
            if (window.scrollY > 30) {
                navbar.classList.remove('at-top');
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
                navbar.classList.add('at-top');
            }
        }
        window.addEventListener('scroll', updateNavbar, { passive: true });
        updateNavbar();

       

        /* newsletter sub email */
        var subscribeBtn = document.getElementById('subscribe-btn');
        var emailInput   = document.getElementById('newsletter-email');

        subscribeBtn.addEventListener('click', function() {
            var email = emailInput.value.trim();

            /* empty and red shaky thing */
            if (email === '') {
                emailInput.style.borderColor = '#ef4444';
                emailInput.style.boxShadow   = '0 0 0 3px rgba(239,68,68,0.15)';
                emailInput.classList.remove('shake');
                void emailInput.offsetWidth; /* restart animation */
                emailInput.classList.add('shake');
                setTimeout(function() {
                    emailInput.style.borderColor = '';
                    emailInput.style.boxShadow   = '';
                }, 1500);
                return;
            }

            /* has email and reload page */
            location.reload();
        });

        /* remove red style as soon as user start typing again */
        emailInput.addEventListener('input', function() {
            emailInput.style.borderColor = '';
            emailInput.style.boxShadow   = '';
        });
      
// click at sign in and sign up
 function switchTab(tab) {
      const isSignup = tab === 'signup';
      const loginBtn = document.getElementById('tabLogin');
      const signupBtn = document.getElementById('tabSignup');

      const activeClasses = ['bg-white', 'text-gray-800', 'shadow-[0_2px_8px_rgba(0,0,0,0.08)]'];
      const inactiveClasses = ['bg-transparent', 'text-gray-400'];

      if (isSignup) {
        loginBtn.classList.remove(...activeClasses);
        loginBtn.classList.add(...inactiveClasses);
        signupBtn.classList.remove(...inactiveClasses);
        signupBtn.classList.add(...activeClasses);
      } else {
        signupBtn.classList.remove(...activeClasses);
        signupBtn.classList.add(...inactiveClasses);
        loginBtn.classList.remove(...inactiveClasses);
        loginBtn.classList.add(...activeClasses);
      }

      document.getElementById('nameField').classList.toggle('show', isSignup);
      document.getElementById('confirmField').classList.toggle('show', isSignup);
      document.getElementById('forgotRow').style.display = isSignup ? 'none' : 'block';

      document.getElementById('formTitle').textContent = isSignup ? 'Create account' : 'Welcome back';
      document.getElementById('formSub').textContent = isSignup
        ? 'Join thousands of explorers today'
        : 'Sign in to continue your journey';
      document.getElementById('submitBtn').textContent = isSignup ? 'Create Account' : 'Sign In';
    }

    function togglePass(inputId, btn) {
      const input = document.getElementById(inputId);
      const icon = btn.querySelector('i');
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      icon.className = isHidden ? 'ri-eye-off-line' : 'ri-eye-line';
    }

     /* card switch */
        const cards     = document.querySelectorAll('.dest-card');
        const heroBg    = document.getElementById('hero-bg');
        const destTitle = document.getElementById('dest-title');
        const destDesc  = document.getElementById('dest-desc');
        const watermark = document.getElementById('dest-watermark');
        const counter   = document.getElementById('dest-counter');
        const slideNum  = document.getElementById('slide-num');

        function pad(n) { return n < 10 ? '0' + n : String(n); }

        function activateCard(card) {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            var dot = document.getElementById('dot-' + card.dataset.index);
            if (dot) dot.classList.add('active');
            destTitle.style.opacity   = '0';
            destTitle.style.transform = 'translateY(14px)';
            destDesc.style.opacity    = '0';
            destDesc.style.transform  = 'translateY(14px)';
            watermark.style.opacity   = '0';
            setTimeout(function () {
                heroBg.style.backgroundImage = "url('" + card.dataset.bg + "')";
                heroBg.classList.remove('bg-fade');
                void heroBg.offsetWidth;
                heroBg.classList.add('bg-fade');
                destTitle.textContent = card.dataset.title;
                destDesc.textContent  = card.dataset.desc;
                watermark.textContent = card.dataset.watermark;
                var num = pad(parseInt(card.dataset.index) + 1);
                counter.textContent  = num;
                slideNum.textContent = num;
                destTitle.style.opacity   = '1';
                destTitle.style.transform = 'translateY(0)';
                destDesc.style.opacity    = '1';
                destDesc.style.transform  = 'translateY(0)';
                watermark.style.opacity   = '1';
            }, 280);
        }
        cards.forEach(function(card) {
            card.addEventListener('click', function() { activateCard(card); });
        });

      
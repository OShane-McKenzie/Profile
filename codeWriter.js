const pythonSnippets = [
      "def main(ui: Page):\n\tui.window_maximized = False\n\thome = PyxisMainContainer(ui)\n\n\tdef route_change(route):\n\t\tPyxisDynamics.set_dynamics(ui.window_width, ui.window_height)\n\t\tui.views.clear()\n\t\tui.views.append(pyxisViews(ui, home)[ui.route])\n\n\tui.on_route_change = route_change\n\tui.go('/')\n\n\nif __name__ == '__main__':\n\tft.app(target=main)"
    ];

    const kotlinSnippets = [
      "@Composable\nfun DisplayCard(option:String,\n\timg:String,\n\tindex: Int,\n\tonClick: (Int) -> Unit,\n\tisSelected: Boolean)\n{Card(shape = MaterialTheme.shapes.medium,\n\t\televation = 4.dp,\n\t\tmodifier = Modifier\n\t\t.padding(16.dp)\n\t\t.width(1000.dp)\n\t\t.clickable { onClick(index) }\n\t) {\t\tRow(\t\tmodifier = Modifier\n\t\t.padding(16.dp),\n\t\thorizontalArrangement = Arrangement.SpaceEvenly\n\t\t) {\t\tText(\t\ttext = option,\n\t\tstyle = TextStyle(color = Color.Black, fontSize = 32.sp),\n\t\tmodifier = Modifier.wrapContentSize(Alignment.Center).width(800.dp),\n\t\tfontWeight = FontWeight.Bold,\n\t\t)\n\t\tSpacer(modifier = Modifier.width(15.dp))\n\t\tImage(\t\tpainter = painterResource(\"./$img\"),\n\t\tcontentDescription = \"art\",\n\t\tmodifier = Modifier.size(100.dp)\n\t\t)\n\t\t}\n\t}\n}"
    ];

    let currentLanguage = "python";
    let snippetIndex = 0;
    let snippetCount = 1;
    let charIndex = 0;
    let typingSpeed = 5; // Adjust typing speed here (in milliseconds)

    function typeCode(code) {
      const terminal = document.getElementById("terminal");
      terminal.innerHTML += code.charAt(charIndex);
      charIndex++;

      if (charIndex < code.length) {
        setTimeout(() => {
          typeCode(code);
        }, typingSpeed);
      } else {
        charIndex = 0;
        Prism.highlightAll();
        setTimeout(() => {
          typeNextSnippet();
        }, 2000); // Delay before clearing the terminal and typing the next snippet
      }
    }

    function clearTerminal() {
      const terminal = document.getElementById("terminal");
      terminal.innerHTML = "";
    }

    function typeNextSnippet() {
      if (currentLanguage === "python") {
        if (snippetIndex >= snippetCount) {
          currentLanguage = "kotlin";
          snippetIndex = 0;
          setTimeout(() => {
            clearTerminal();
            typeNextSnippet();
          }, 1000); // Delay before typing the first Kotlin snippet
        } else {
          typeCode(pythonSnippets[snippetIndex]);
          snippetIndex++;
        }
      } else {
        if (snippetIndex >= snippetCount) {
          currentLanguage = "python";
          snippetIndex = 0;
          setTimeout(() => {
            clearTerminal();
            typeNextSnippet();
          }, 1000); // Delay before typing the first Python snippet
        } else {
          typeCode(kotlinSnippets[snippetIndex]);
          snippetIndex++;
        }
      }
    }

    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Start the typing loop
    typeNextSnippet();
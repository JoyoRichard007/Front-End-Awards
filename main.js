$(document).ready(function() {
    var container = $(".main");
  
    container.on("wheel", function(event) {
      event.preventDefault();
      var scrollAmount = event.originalEvent.deltaY || event.originalEvent.wheelDelta;
  
      container.scrollLeft(container.scrollLeft() + scrollAmount);
    });


    var sections = $('.section');
    var currentSection = 0;
    var isScrolling = false;
  
    // Fonction de défilement horizontal
    function scrollToSection(index) {
      if (!isScrolling && index >= 0 && index < sections.length) {
        isScrolling = true;
        container.animate({
          scrollLeft: sections.eq(index).offset().left
        }, 500, function() {
          isScrolling = false;
        });
        currentSection = index;
      }
    }
  
    // Gestion du défilement horizontal avec la molette de la souris
    container.on('wheel', function(e) {
      e.preventDefault();
      
      var delta = e.originalEvent.deltaY;
      var scrollDirection = (delta > 0) ? 'right' : 'left';
  
      if (scrollDirection === 'right' && currentSection < sections.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (scrollDirection === 'left' && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    });

    $('.next .button').click(function() {
      var container = $('.container-horizontal');
      var scrollLeft = container.scrollLeft();
      var sectionWidth = $('.section').outerWidth();
      container.animate({ scrollLeft: scrollLeft + sectionWidth }, 500);
    });
  
    $('.previous .button').click(function() {
      var container = $('.container-horizontal');
      var scrollLeft = container.scrollLeft();
      var sectionWidth = $('.section').outerWidth();
      container.animate({ scrollLeft: scrollLeft - sectionWidth }, 500);
    });

    var cursor = document.querySelector('.cursor');
    var cursorinner = document.querySelector('.cursor2');
    var a = document.querySelectorAll('a');

    document.addEventListener('mousemove', function(e){
      var x = e.clientX;
      var y = e.clientY;
      cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    });

    document.addEventListener('mousemove', function(e){
      var x = e.clientX;
      var y = e.clientY;
      cursorinner.style.left = x + 'px';
      cursorinner.style.top = y + 'px';
    });

    document.addEventListener('mousedown', function(){
      cursor.classList.add('click');
      cursorinner.classList.add('cursorinnerhover')
    });

    document.addEventListener('mouseup', function(){
      cursor.classList.remove('click')
      cursorinner.classList.remove('cursorinnerhover')
    });

    a.forEach(item => {
      item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
      });
      item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
      });
    })
  });          

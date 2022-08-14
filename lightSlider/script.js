class Carousel {
  constructor(element, settings) {
    const defSettings = {
      item: 3,
    };

    this.settings = Object.assign({}, defSettings, settings);
    this.el = element;
    this.children = this.el.querySelectorAll('.carousel__item');
    this.container = this.el.querySelector('.carousel__move');
    this.button = this.el.querySelectorAll('.carousel__button');

    this.elWidth = this.el.offsetWidth;
    this.slideWidth = this.getSlideWidth();
    this.containerWidth = this.getContainerWidth();
    this.scene = 0;
    this.shift = 0;

    this.initialStyle();
    this.controls();
    this.resize();
  }

  getSlideWidth() {
    return this.elWidth / this.settings.item;
  }

  getContainerWidth() {
    return this.slideWidth * this.children.length;
  }

  initialStyle() {
    this.container.style.width = `${this.containerWidth}px`;
    this.children.forEach((el) => {
      el.style.width = `${this.slideWidth}px`
    });
  }

  controls() {
    this.el.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.carousel__prev')) {
        if (this.scene > 0) {
          this.scene--;
        }
      } else if (target.closest('.carousel__next')) {
        if (this.scene < this.children.length && this.shift < this.containerWidth - this.elWidth) {
          this.scene++;
        }
      }
      this.slide();
    });
  }

  slide() {
    this.shift = this.scene * this.slideWidth;
    this.container.style.transform = `translatex(${-this.shift}px)`;
  }

  resize() {
    window.addEventListener('resize', () => {
      this.elWidth = this.el.offsetWidth;
      this.slideWidth = this.getSlideWidth();
      this.containerWidth = this.getContainerWidth();

      this.initialStyle();
    });
  }
}
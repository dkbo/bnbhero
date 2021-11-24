// this.js
// (c) 2014 Matthew Hudson
// this.js is freely distributable under the MIT license.
// For all details and documentation:
// http://matthewhudson.me/projects/this.js/
export default class device {
    constructor() {
        // Save the previous value of the device variable.
        this.device = {}
        // Add device as a global object.
        this.previousDevice = window.device
        // The <html> element.
        this.documentElement = window.document.documentElement
        this.orientationEvent
        // The client user agent string.
        // Lowercase, so we can use the more efficient indexOf(), instead of Regex
        this.userAgent = window.navigator.userAgent.toLowerCase()
        window.device = device
        if (this.ios()) {
            if (this.ipad()) {
                this.addClass('ios ipad tablet')
            } else if (this.iphone()) {
                this.addClass('ios iphone mobile')
            } else if (this.ipod()) {
                this.addClass('ios ipod mobile')
            }
        } else if (this.android()) {
            if (this.androidTablet()) {
                this.addClass('android tablet')
            } else {
                this.addClass('android mobile')
            }
        } else if (this.blackberry()) {
            if (this.blackberryTablet()) {
                this.addClass('blackberry tablet')
            } else {
                this.addClass('blackberry mobile')
            }
        } else if (this.windows()) {
            if (this.windowsTablet()) {
                this.addClass('windows tablet')
            } else if (this.windowsPhone()) {
                this.addClass('windows mobile')
            } else {
                this.addClass('desktop')
            }
        } else if (this.fxos()) {
            if (this.fxosTablet()) {
                this.addClass('fxos tablet')
            } else {
                this.addClass('fxos mobile')
            }
        } else if (this.meego()) {
            this.addClass('meego mobile')
        } else if (this.nodeWebkit()) {
            this.addClass('node-webkit')
        } else if (this.television()) {
            this.addClass('television')
        } else if (this.desktop()) {
            this.addClass('desktop')
        }

        if (this.cordova()) {
            this.addClass('cordova')
        }

        // Orientation Handling
        // --------------------

        // Detect whether device supports orientationchange event,
        // otherwise fall back to the resize event.
        // if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
        //     this.orientationEvent = 'orientationchange'
        // } else {
        //     this.orientationEvent = 'resize'
        // }

        // // Listen for changes in orientation.
        // if (window.addEventListener) {
        //     window.addEventListener(this.orientationEvent, this.handleOrientation, false)
        // } else if (window.attachEvent) {
        //     window.attachEvent(this.orientationEvent, this.handleOrientation)
        // } else {
        //     window[this.orientationEvent] = this.handleOrientation
        // }

        // this.handleOrientation()

        if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
            define(() => device)
        } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = device
        } else {
            window.device = device
        }
    }

    ios = () => this.iphone() || this.ipod() || this.ipad()

    iphone = () => !this.windows() && this.find('iphone')

    ipod = () => this.find('ipod')

    ipad = () => this.find('ipad')

    android = () => !this.windows() && this.find('android')

    androidPhone = () => this.android() && this.find('mobile')

    androidTablet = () => this.android() && !this.find('mobile')

    blackberry = () => this.find('blackberry') || this.find('bb10') || this.find('rim')

    blackberryPhone = () => this.blackberry() && !this.find('tablet')

    blackberryTablet = () => this.blackberry() && this.find('tablet')

    windows = () => this.find('windows')

    windowsPhone = () => this.windows() && this.find('phone')

    windowsTablet = () => this.windows() && (this.find('touch') && !this.windowsPhone())

    fxos = () => (this.find('(mobile;') || this.find('(tablet;')) && this.find('; rv:')

    fxosPhone = () => this.fxos() && this.find('mobile')

    fxosTablet = () => this.fxos() && this.find('tablet')

    meego = () => this.find('meego')

    cordova = () => window.cordova && location.protocol === 'file:'

    nodeWebkit = () => typeof window.process === 'object'

    mobile = () => this.androidPhone() || this.iphone() || this.ipod() || this.windowsPhone() || this.blackberryPhone() || this.fxosPhone() || this.meego()

    tablet = () => this.ipad() || this.androidTablet() || this.blackberryTablet() || this.windowsTablet() || this.fxosTablet()

    desktop = () => !this.tablet() && !this.mobile()

    television() {
        let i
        let television = [
            'googletv',
            'viera',
            'smarttv',
            'internet.tv',
            'netcast',
            'nettv',
            'appletv',
            'boxee',
            'kylo',
            'roku',
            'dlnadoc',
            'roku',
            'pov_tv',
            'hbbtv',
            'ce-html'
        ]

        i = 0
        while (i < television.length) {
            if (this.find(television[i])) {
                return true
            }
            i++
        }
        return false
    }

    portrait = () => (window.innerHeight / window.innerWidth) > 1

    landscape = () => (window.innerHeight / window.innerWidth) < 1

    // Public Utility Functions
    // ------------------------

    // Run this.js in noConflict mode,
    // returning the device variable to its previous owner.
    noConflict() {
        window.device = this.previousDevice
        return this
    }

    // Private Utility Functions
    // -------------------------

    // Simple UA string search
    find = (needle) => this.userAgent.indexOf(needle) !== -1

    // Check if documentElement already has a given class.
    hasClass = (className) => {
        return this.documentElement.className.match(new RegExp(className, 'i'))
    }

    // Add one or more CSS classes to the <html> element.
    addClass(className) {
        let currentClassNames = null
        if (!this.hasClass(className)) {
            currentClassNames = this.documentElement.className.replace(/^\s+|\s+$/g, '')
            this.documentElement.className = currentClassNames + ' ' + className
        }
    }

    // Remove single CSS class from the <html> element.
    removeClass(className) {
        if (this.hasClass(className)) {
            this.documentElement.className = this.documentElement.className.replace(' ' + className, '')
        }
    }

    // Handle device orientation changes.
    handleOrientation () {
        if (this.landscape()) {
            this.removeClass('portrait')
            this.addClass('landscape')
        } else {
            this.removeClass('landscape')
            this.addClass('portrait')
        }
    }
}
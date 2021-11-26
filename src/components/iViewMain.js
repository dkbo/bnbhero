import Affix from 'iView/src/components/affix'
// import Alert from 'iView/src/components/alert'
import AutoComplete from 'iView/src/components/auto-complete'
// import Avatar from 'iView/src/components/avatar'
// import BackTop from 'iView/src/components/back-top'
// import Badge from 'iView/src/components/badge'
// import Breadcrumb from 'iView/src/components/breadcrumb'
import Button from 'iView/src/components/button'
// import Card from 'iView/src/components/card'
// import Carousel from 'iView/src/components/carousel'
// import Cascader from 'iView/src/components/cascader'
// import Checkbox from 'iView/src/components/checkbox'
// import Circle from 'iView/src/components/circle'
import Collapse from 'iView/src/components/collapse'
// import ColorPicker from 'iView/src/components/color-picker'
import Content from 'iView/src/components/content'
import DatePicker from 'iView/src/components/date-picker'
// import Dropdown from 'iView/src/components/dropdown'
// import Footer from 'iView/src/components/footer'
// import Form from 'iView/src/components/form'
import Header from 'iView/src/components/header'
import Icon from 'iView/src/components/icon'
import Input from 'iView/src/components/input'
// import InputNumber from 'iView/src/components/input-number'
// import Scroll from 'iView/src/components/scroll'
import Layout from 'iView/src/components/layout'
// import LoadingBar from 'iView/src/components/loading-bar'
// import Menu from 'iView/src/components/menu'
import Message from 'iView/src/components/message'
// import Modal from 'iView/src/components/modal'
// import Notice from 'iView/src/components/notice'
import Page from 'iView/src/components/page'
// import Poptip from 'iView/src/components/poptip'
// import Progress from 'iView/src/components/progress'
// import Radio from 'iView/src/components/radio'
// import Rate from 'iView/src/components/rate'
import Sider from 'iView/src/components/sider'
import Slider from 'iView/src/components/slider'
// import Spin from 'iView/src/components/spin'
// import Steps from 'iView/src/components/steps'
// import Switch from 'iView/src/components/switch'
import Table from 'iView/src/components/table'
// import Tabs from 'iView/src/components/tabs'
// import Tag from 'iView/src/components/tag'
// import Timeline from 'iView/src/components/timeline'
// import TimePicker from 'iView/src/components/time-picker'
// import Tooltip from 'iView/src/components/tooltip'
// import Transfer from 'iView/src/components/transfer'
// import Tree from 'iView/src/components/tree'
// import Upload from 'iView/src/components/upload'
import {Row, Col} from 'iView/src/components/grid'
import {Select, Option, OptionGroup} from 'iView/src/components/select'
import locale from 'iView/src/locale/index'
const components = {
    Affix,
    // Alert,
    AutoComplete,
    // Avatar,
    // BackTop,
    // Badge,
    // Breadcrumb,
    // BreadcrumbItem: Breadcrumb.Item,
    Button,
    ButtonGroup: Button.Group,
    // Card,
    // Carousel,
    // CarouselItem: Carousel.Item,
    // Cascader,
    // Checkbox,
    // CheckboxGroup: Checkbox.Group,
    Col,
    Collapse,
    // ColorPicker,
    Content: Content,
    DatePicker,
    // Dropdown,
    // DropdownItem: Dropdown.Item,
    // DropdownMenu: Dropdown.Menu,
    // Footer: Footer,
    // Form,
    // FormItem: Form.Item,
    Header: Header,
    Icon,
    Input,
    // InputNumber,
    // Scroll,
    Sider: Sider,
    // Submenu: Menu.Sub,
    Layout: Layout,
    // LoadingBar,
    // Menu,
    // MenuGroup: Menu.Group,
    // MenuItem: Menu.Item,
    Message,
    // Modal,
    // Notice,
    Option: Option,
    OptionGroup,
    Page,
    Panel: Collapse.Panel,
    // Poptip,
    // Progress,
    // Radio,
    // RadioGroup: Radio.Group,
    // Rate,
    Row,
    Select,
    Slider,
    // Spin,
    // Step: Steps.Step,
    // Steps,
    Table
    // Tabs: Tabs,
    // TabPane: Tabs.Pane,
    // Tag,
    // Timeline,
    // TimelineItem: Timeline.Item,
    // TimePicker,
    // Tooltip,
    // Transfer,
    // Tree,
    // Upload
}

const iview = {
    ...components,
    iButton: Button,
    // iCircle: Circle,
    iCol: Col,
    iContent: Content,
    // iForm: Form,
    // iFooter: Footer,
    iHeader: Header,
    iInput: Input,
    // iMenu: Menu,
    iOption: Option,
    // iProgress: Progress,
    iSelect: Select,
    // iSwitch: Switch,
    iTable: Table
}

const install = function(Vue, opts = {}) {
    if (install.installed) return
    locale.use(opts.locale)
    // locale.i18n(opts.i18n)

    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key])
    })

    // Vue.prototype.$Loading = LoadingBar
    Vue.prototype.$Message = Message
    // Vue.prototype.$Modal = Modal
    // Vue.prototype.$Notice = Notice
    // Vue.prototype.$Spin = Spin
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    locale: locale.use,
    // i18n: locale.i18n,
    install,
    // Circle,
    // Switch,
    ...components
}

API.lang = (code) => {
    const langObject = window['iview/locale'].default
    if (code === langObject.i.locale) locale.use(langObject)
    else console.log(`The ${code} language pack is not loaded.`) // eslint-disable-line no-console
}

export default API // eslint-disable-line no-undef

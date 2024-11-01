const topBar = document.getElementById('top-bar')
const exteriorColorSection = document.getElementById('exterior-buttons')
const interiorColorSection = document.getElementById('interior-buttons')
const wheelButtonsSection = document.getElementById('wheel-buttons')
const performanceButton = document.getElementById('performance-btn')
const totalPriceElement = document.getElementById('total-price')
const fullSelfDrivingCheckbox = document.getElementById(
	'full-self-driving-checkbox'
)
const accessories = document.querySelectorAll('.accessory-form-checkbox')
const exteriorImage = document.getElementById('exterior-image')
const interiorImage = document.getElementById('interior-image')

const downPaymentElement = document.querySelector('#down-payment')
const monthlyPaymentElement = document.querySelector('#monthly-payment')

let selectedColor = 'Stealth Grey'
const selectedOptions = {
	'Performance Wheels': false,
	'Performance Package': false,
	'Full Self-Driving': false,
}
const basePrice = 52490
let currentPrice = basePrice

const pricing = {
	'Performance Wheels': 2500,
	'Performance Package': 5000,
	'Full Self-Driving': 8500,
	Accessories: {
		'Center Console Trays': 35,
		Sunshade: 105,
		'All-Weather Interior Liners': 225,
	},
}

// update total price

const updateTotalPrice = () => {
	currentPrice = basePrice

	if (selectedOptions['Performance Wheels']) {
		currentPrice += pricing['Performance Wheels']
	}
	if (selectedOptions['Performance Package']) {
		currentPrice += pricing['Performance Package']
	}
	if (selectedOptions['Full Self-Driving']) {
		currentPrice += pricing['Full Self-Driving']
	}

	// accessory checks
	accessories.forEach((box) => {
		const accessoryLabel = box
			.closest('label')
			.querySelector('span')
			.textContent.trim()

		const accessoryPrice = pricing['Accessories'][accessoryLabel]

		// add to currPrice

		if (box.checked) {
			currentPrice += accessoryPrice
		}
	})

	// update total price

	totalPriceElement.textContent = `$${currentPrice.toLocaleString()}`

	updatePaymentBreakdown()
}

// update payment based on curr pric

const updatePaymentBreakdown = () => {
	const downPayment = currentPrice * 0.1
	downPaymentElement.textContent = `$${downPayment.toLocaleString()}`

	// calculate loan details
	const loanMonths = 60
	const intRate = 0.03

	const loanAmt = currentPrice - downPayment
	const monthlyIntRate = intRate / 12
	const monthlyPayment =
		(loanAmt * (monthlyIntRate * Math.pow(1 + monthlyIntRate, loanMonths))) /
		(Math.pow(1 + monthlyIntRate, loanMonths) - 1)

	monthlyPaymentElement.textContent = `$${monthlyPayment
		.toFixed(2)
		.toLocaleString()}`
}

// handle top bar on scroll
const handleScroll = () => {
	const atTop = window.scrollY === 0
	topBar.classList.toggle('visible-bar', atTop)
	topBar.classList.toggle('hidden-bar', !atTop)
}

// image mapping

const exteriorImages = {
	'Stealth Grey':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-stealth-grey.jpg?raw=true',
	'Pearl White':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-pearl-white.jpg?raw=true',
	'Deep Blue':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-deep-blue-metallic.jpg?raw=true',
	'Solid Black':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-solid-black.jpg?raw=true',
	'Ultra Red':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-ultra-red.jpg?raw=true',
	Quicksilver:
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-quicksilver.jpg?raw=true',
}

const exteriorPerfImages = {
	'Stealth Grey':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-stealth-grey-performance.jpg?raw=true',
	'Pearl White':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-pearl-white-performance.jpg?raw=true',
	'Deep Blue':
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-deep-blue-metallic-performance.jpg?raw=true.jpg',
}

const interiorImages = {
	Dark: 'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-interior-dark.jpg?raw=true',
	Light:
		'https://github.com/bradtraversy/tesla-configurator-vanilla-js/blob/main/images/model-y-interior-light.jpg?raw=true',
}

const handleColorButtonClick = (e) => {
	console.log(exteriorImages['Stealth Grey'])
	let button

	if (e.target.tagName === 'IMG') {
		button = e.target.closest('button')
	} else if (e.target.tagName === 'BUTTON') {
		button = e.target
	}

	if (button) {
		const buttons = e.currentTarget.querySelectorAll('button')
		buttons.forEach((button) => button.classList.remove('btn-selected'))
		button.classList.add('btn-selected')

		// change exterior image

		if (e.currentTarget === exteriorColorSection) {
			selectedColor = button.querySelector('img').alt
			exteriorImage.src = exteriorImages[selectedColor]
			updateExteriorImage()
		}
		if (e.currentTarget === interiorColorSection) {
			color = button.querySelector('img').alt
			console.log(color)
			interiorImage.src = interiorImages[color]
		}
	}
}

// update exterior image based on color and wheels

const updateExteriorImage = () => {
	const performanceSuffix = selectedOptions['Performance Wheels']
		? '-performance'
		: ''
	const colorKey =
		selectedColor in exteriorImages ? selectedColor : 'Stealth Grey'
	exteriorImage.src = exteriorImages[colorKey].replace(
		'.jpg',
		`${performanceSuffix}.jpg`
	)
}
const handleWheelButtonClick = (e) => {
	if (e.target.tagName === 'BUTTON') {
		const buttons = document.querySelectorAll('#wheel-buttons button')
		console.log(buttons)
		buttons.forEach((button) => {
			button.classList.remove('bg-gray-700', 'text-white')
		})

		// add styles to clicked button
		e.target.classList.add('bg-gray-700', 'text-white')

		selectedOptions['Performance Wheels'] =
			e.target.textContent.includes('Performance')

		updateExteriorImage()

		updateTotalPrice()
	}
}

// performance button

const handlePerformanceButtonClick = (e) => {
	const isSelected = performanceButton.classList.toggle('bg-gray-700')
	performanceButton.classList.toggle('text-white')

	// update selected options

	selectedOptions['Performance Package'] = isSelected

	updateTotalPrice()
}

const handleFullSelfDrivingCheck = (e) => {
	const isSelected = e.target.checked

	selectedOptions['Full Self-Driving'] = isSelected

	updateTotalPrice()
}

const handleAccessoryCheck = (e) => {
	console.log(e.target.closest('label'))
}

updateTotalPrice()

window.addEventListener('scroll', () => requestAnimationFrame(handleScroll))

exteriorColorSection.addEventListener('click', handleColorButtonClick)
interiorColorSection.addEventListener('click', handleColorButtonClick)
wheelButtonsSection.addEventListener('click', handleWheelButtonClick)
performanceButton.addEventListener('click', handlePerformanceButtonClick)
fullSelfDrivingCheckbox.addEventListener('change', handleFullSelfDrivingCheck)
accessories.forEach((accessory) => {
	accessory.addEventListener('change', () => updateTotalPrice())
})

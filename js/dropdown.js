class DropdownMenu {
	constructor(toggleElement) {
		this.toggleElement = toggleElement
		this.dropdownMenu = toggleElement.nextElementSibling

		this.toggleElement.addEventListener("click", event => {
			event.preventDefault()
			this.toggleDropdown()
		})
	}

	toggleDropdown() {
		const isOpen = this.dropdownMenu.classList.contains("show")
		this.closeAllDropdowns()

		if (!isOpen) {
			this.setDropdownPosition()
			this.dropdownMenu.classList.add("show")
		}
	}

	setDropdownPosition() {
		const toggleRect = this.toggleElement.getBoundingClientRect()
		const leftPosition = getComputedStyle(
			document.documentElement
		).getPropertyValue("--dropdown-left")
		const leftOffset = getComputedStyle(
			document.documentElement
		).getPropertyValue("--dropdown-offset-left")
		const leftOffsetValue = leftOffset ? parseFloat(leftOffset) : 0
		const left =
			toggleRect.left +
			toggleRect.width * (parseFloat(leftPosition) / 100) +
			leftOffsetValue

		const topPosition = getComputedStyle(
			document.documentElement
		).getPropertyValue("--dropdown-top")
		const topOffset = getComputedStyle(
			document.documentElement
		).getPropertyValue("--dropdown-offset-top")
		const topOffsetValue = topOffset ? parseFloat(topOffset) : 0
		this.dropdownMenu.style.left = `${left}px`
		this.dropdownMenu.style.top = `${
			toggleRect.bottom + parseFloat(topPosition) + topOffsetValue
		}px`
	}

	closeAllDropdowns() {
		const allMenus = document.querySelectorAll(".dropdown-menu")
		allMenus.forEach(menu => menu.classList.remove("show"))
	}
}

const dropdownToggles = document.querySelectorAll(".dropdown-toggle")
dropdownToggles.forEach(toggle => new DropdownMenu(toggle))

document.addEventListener("click", function (event) {
	const isClickInside = Array.from(dropdownToggles).some(toggle =>
		toggle.contains(event.target)
	)
	const isClickInsideDropdown = Array.from(
		document.querySelectorAll(".dropdown-menu")
	).some(menu => menu.contains(event.target))

	if (!isClickInside && !isClickInsideDropdown) {
		dropdownToggles.forEach(toggle => {
			const dropdownMenu = toggle.nextElementSibling
			dropdownMenu.classList.remove("show")
		})
	}
})

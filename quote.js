


async function fetchQuote() {
    const url = "https://qapi.vercel.app/api/random"
    const request = new Request(url)
    const response = await request.loadJSON()
    return response
}

async function createWidget(quoteData) {
    // Create widget
    const widget = new ListWidget()
    let nextRefresh = Date.now() + 1000*60*5 // add 5 min to now
    widget.refreshAfterDate = new Date(nextRefresh)
    widget.backgroundColor = new Color("#242424")
    widget.setPadding(5, 5, 5, 5)
    const quote = quoteData.quote.replace(/\.+$/, "")
    const author = quoteData.author

    // Add the quote
    const authorText = widget.addText("«" + quote + "»")
    authorText.textColor = new Color("#989898")
    authorText.font = new Font("AvenirNextCondensed-Medium", 16)
    authorText.lineLimit = 4
    widget.addSpacer(4)

    // Add the author
    const quoteText = widget.addText("—" + author)
    quoteText.textColor = new Color("#989898")
    quoteText.font = new Font("AvenirNextCondensed-MediumItalic", 16)
    quoteText.lineLimit = 1
    
    return widget
}
  


const quoteData = await fetchQuote()
const widget = await createWidget(quoteData)

if (config.runsInWidget) {
    Script.setWidget(widget)
    // Script.complete()
  } else if (args.widgetParameter === 'callback') {
    const timestamp = (new Date().getTime() - new Date('2001/01/01').getTime()) / 1000
    const callback = new CallbackURL(`${WIDGET_CONFIGURATIONS.callbackCalendarApp}:${timestamp}`)
    callback.open()
    // Script.complete()
  } else {
    Script.setWidget(widget)
    widget.presentMedium()
    // Script.complete()
  }
  
  
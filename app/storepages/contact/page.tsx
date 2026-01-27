

function page() {
  return (
    <div>
      <main className="max-w-5xl mx-auto px-6 py-4 md:py-14">
        <h1 className="text-2xl  text-center md:text-4xl font-bold mb-6 text-purple-900">
          Contact Total Grace Communication
        </h1>

        <p className="text-gray-700 text-justify mb-10 leading-relaxed ">
          For product inquiries, availability confirmation, or to place an order,
          please contact Total Grace Communication using any of the channels below.
          Our team is available to assist you promptly during business hours.
        </p>

        <section className="grid gap-8 md:grid-cols-2 text-[12px] md:text-[16px]">
          {/* Primary Contact */}
          <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-xl font-semibold mb-3 text-purple-900">Primary  Contact</h2>
            <p className="text-gray-700 mb-4">
              WhatsApp is our fastest and preferred communication channel.
            </p>

            <a
              href="https://wa.me/2348034244426"
              target="_blank"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-medium"
            >
              Chat with us on WhatsApp
            </a>
          </div>

          {/* Alternative Contacts */}
          <div className="border rounded-lg p-6 bg-white ">
            <h2 className="text-xl font-semibold mb-3 text-purple-900">Alternative Contacts</h2>

            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-medium">Phone:</span> +2348026958471
              </p>
              <p>
                <span className="font-medium">Email:</span>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=totalgrace.tgc580@gmail.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> totalgrace.tgc580@gmail.com </a> 
              </p>
            </div>
          </div>
        </section>

        {/* Business Info */}
        <section className="mt-10 border rounded-lg p-6 bg-white text-[12px] md:text-[16px]">
          <h2 className="text-xl font-semibold mb-3 text-purple-900">Business Information</h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Business Hours:</span> Monday to Saturday,
              9:00 AM to 6:00 PM
            </p>
            <p>
              <span className="font-medium">Response Time:</span> Typically within
              a few minutes during business hours
            </p>
            <p>
              <span className="font-medium">Service Area:</span> Nationwide
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default page

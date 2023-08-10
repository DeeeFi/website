export default function NewsletterSignup(props) {
  return (
    <form
      action="https://qlfintech.us12.list-manage.com/subscribe/post?u=673c533b8a48db89a59c6359d&amp;id=49d5a8f021&amp;f_id=006ebde0f0"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      className="validate form max-w-screen-sm"
      target="_blank"
      noValidate
    >
      <div className="input-group" id="mc_embed_signup_scroll">
        <div className="mc-field-group w-full relative">
          <input
            className={`appearance-none outline-none text-wall-500 type-ui bg-white black ${
              props.color || "border-wall-600"
            } border-4 px-3 w-full mb-2 h-16 rounded-xl`}
            type="email"
            name="EMAIL"
            id="mce-EMAIL"
            placeholder="your@email.com"
          />
          <div className="flex h-16 items-center justify-center absolute top-0 right-6">
            <button
              id="mc-embedded-subscribe"
              className="type-ui dark:text-green-400 text-wall-500 bg-transparent"
              type="submit"
              name="subscribe"
            >
              {/* onClick={() => _paq.push(['trackEvent', 'Mailing List', 'Subscribe'])}> */}
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

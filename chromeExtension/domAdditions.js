
export const style =
  `<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.min.css">`
export function appendSidebar(name) {
  const sidebar =
  `<div class='scroll annotate-sidebar' style='display: none'>
    <nav class="panel">
      <p class="panel-heading annotate-header">
        <strong>Comments</strong>
      </p>
    </nav>

    <article class='contentHere'></article>

    <article class='media'>
      <figure class='media-left'>
        <p class='image is-48x48 leftBuffer'>
          <img src='http://bulma.io/images/placeholders/128x128.png'>
        </p>
      </figure>
      <div class='media-content'>
        <form id='formSubmission'>
          <div class='field'>
            <p class='control rightBuffer'>
              <textarea
              id='commentSubmission'
                class='textarea is-size-7'
                placeholder='${name}, what do you think?'
            ></textarea>
            </p>
          </div>
          <div class='field'>
            <p class='control rightBuffer'>
              <input type=submit class='button is-size-7'>
            </p>
          </div>
        </form>
      </div>
    </article>
  </div>`
  $('body').append(sidebar)
}

export const sidebarToggle = '<div class="annotate-toggle far-right "></div>'
export const toggleButton =
  `<a
    class='button iconText is-dark is-medium is-focused'>
    <i class='fa fa-globe'></i>20-20
  </a>`

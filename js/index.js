document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form")

    form.addEventListener("submit", (e) => {
        e.preventDefault()
        searchUser(e.target.search.value)
        clearForm()
    })

    function searchUser(user) {
        return fetch(`https://api.github.com/search/users?q=${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept": "application/vnd.github.v3+json"
            }
        })
            .then(res => res.json())
            .then((x) => {
                x.items.forEach(person => renderList(person))
            }
            )
    }

    function getRepo(user) {
        return fetch(`https://api.github.com/users/${user}/repos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept": "application/vnd.github.v3+json"
            }
        })
            .then(res => res.json())
            .then((x) => {
                x.forEach(person => {
                    console.log(person)
                    renderRepoList(person)}
                    )

            }
            )

    }

    function renderList(user) {
        let userCard = document.createElement("li")
        userCard.innerHTML = `
        <h2>${user.login}</h2>
        <a href="${user.html_url}">Profile</a>
        <br>
        <br>
        <img src="${user.avatar_url}">
        <br>
        <br>
        <button class="learn-more" id=${user.id}>${user.login}'s Repo</button>
        `

        let userList = document.querySelector("#user-list")
        userList.appendChild(userCard)

        userCard.querySelector("button").addEventListener("click", () => {
            document.querySelector("#repos-list").innerHTML = ``;
            console.log()
            getRepo(user.login)
        }

        )
    }

    function renderRepoList(repo) {
        let repoList = document.createElement("li")
        repoList.innerHTML = `
        <h2>${repo.name}</h2>
        `
        document.querySelector("#repos-list").appendChild(repoList)
    }

    function clearForm() {
        form.reset();
    }


})

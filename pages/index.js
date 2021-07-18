import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { PostsBoxWrapper } from "../src/components/PostsBox";

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${propriedades.githubUser}`}
        >
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.link_url} key={itemAtual}>
                <img src={itemAtual.img_url} />
                <span>{itemAtual.caption}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

function ProfileFollowers(props) {
  return (
    <ProfileRelationsBox
      title={props.title}
      items={props.items.map(function (s) {
        return {
          id: s.id,
          link_url: `https://github.com/${s.login}`,
          img_url: `https://github.com/${s.login}.png`,
          caption: s.login,
        };
      })}
    />
  );
}

export default function Home(props) {
  const usuarioAleatorio = props.githubUser;
  const [comunidades, setComunidades] = React.useState([
    {
      id: "123",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);

  const pessoasFavoritas = [
    "janaite",
    "peas",
    "omariosouto",
    "juunegreiros",
    "marcobrunodev",
    "felipefialho",
  ];

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.github.com/users/giselli/followers")
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
        //console.log("x" + respostaCompleta);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "27bd2df289a0a618a7e48d9389287d",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then((response) => response.json())
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato);
        setComunidades(comunidadesVindasDoDato);
      });
  }, []);

  //console.log("seguidores antes do return", seguidores);
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={usuarioAleatorio} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handleCriaComunidade(e) {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log("Campo: ", dadosDoForm.get("title"));
                console.log("Campo: ", dadosDoForm.get("image"));

                const comunidade = {
                  title: dadosDoForm.get("title"),
                  imageUrl: dadosDoForm.get("image"),
                  creatorSlug: usuarioAleatorio,
                };
                fetch("/api/comunidades", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(comunidade),
                }).then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
          <PostsBoxWrapper>
            <h1 className="depoimentos">Depoimentos</h1>
          </PostsBoxWrapper>
          <PostsBoxWrapper>
            <div className="alinhados">
              <img src="https://scontent-gru1-1.xx.fbcdn.net/v/t1.6435-9/98075547_10223551681885991_2693755315698008064_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeFBlba-18BVlmBp7gDzKCausVvOvjReRSWxW86-NF5FJbkAth8iOs1iqGLeBhHJEsc&_nc_ohc=xKSdoeh9Q84AX_ta79U&_nc_ht=scontent-gru1-1.xx&oh=9c6c828b0308bff29da3ee021a076a81&oe=60F96D0D" />
              <div className="textos">
                <h1>Gatinho</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus pulvinar faucibus neque, nec rhoncus nunc ultrices
                  sit amet. Curabitur ac sagittis neque, vel egestas est. Aenean
                  elementum, erat at aliquet hendrerit, elit nisl posuere
                  tortor, id suscipit diam dui sed nisi. Morbi sollicitudin
                  massa vel tortor consequat, eget semper nisl fringilla.
                  Maecenas at hendrerit odio. Sed in mi eu quam suscipit
                  bibendum quis at orci. Pellentesque fermentum nisl purus, et
                  iaculis lectus pharetra sit amet.
                </p>
              </div>
            </div>
          </PostsBoxWrapper>
          <PostsBoxWrapper>
            <div className="alinhados">
              <img src="https://i.picsum.photos/id/755/200/200.jpg?hmac=fgsDUz8GLl3UPtHhHlMIabU9V8LhbOPCwYGzrrn6CyU" />
              <div className="textos">
                <h1>Vovó Nena</h1>
                <p>
                  Quam diam aliquam condimentum orci mollis risus dui lectus
                  velit, quis cubilia amet mauris velit magna facilisis arcu
                  pharetra leo, risus consequat vulputate aenean nisi gravida mi
                  tellus. fringilla lectus ad nullam habitasse fringilla
                  accumsan ut, integer nunc viverra lorem condimentum lacus
                  congue, dolor torquent laoreet sapien ante est. purus interdum
                  feugiat purus non praesent maecenas curabitur netus, lorem
                  hendrerit enim aenean dolor consectetur congue, dolor habitant
                  sem proin lorem quisque eros. duis massa sociosqu vulputate
                  ligula suspendisse nostra non placerat, integer lacinia
                  potenti aliquet ipsum mauris hac molestie gravida, vivamus
                  accumsan molestie aliquam massa ut himenaeos.
                </p>
              </div>
            </div>
          </PostsBoxWrapper>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileFollowers title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>

            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((resposta) => resposta.json());

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}

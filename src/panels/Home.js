import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

export const Home = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };
  const routeNavigator = useRouteNavigator();

  async function openRandomCatStory() {
    try {
      const response = await fetch('https://api.sefinek.net/api/v2/random/animal/cat');
      const data = await response.json();
      const imageUrl = data.message;

      await bridge.send("VKWebAppShowStoryBox", {
        background_type: "image",
        url: imageUrl
      });
    } catch (err) {
      console.error('Ошибка при открытии истории:', err);
      alert('Не удалось открыть историю');
    }
  }

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header size="s">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header size="s">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
        <Div>
          <Button
              stretched
              size="l"
              onClick={openRandomCatStory}
              style={{ backgroundColor: '#ff69b4', color: '#fff' }}
          >
            выложим в историю случайного котика?:))
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  fetchedUser: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};

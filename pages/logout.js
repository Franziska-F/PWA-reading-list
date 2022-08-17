import cookie from 'cookie';
import { deleteSession } from '../util/database';

export default function Logout() {
  return null;
}

export async function getServerSideProps(context, props) {
  const token = context.req.cookies.sessionToken;

  if (token) {
    await deleteSession(token);

    context.res.setHeader(
      'Set-Cookie',
      cookie.serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
    props.props.displayBookCount();
  }

  return {
    redirect: {
      destination: `/login`,
      permanent: false,
    },
  };
}

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../core/routes/routes.dart';
import '../../../../core/utils/helper.dart';
import '../bloc/login_bloc/login_bloc.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  static Route route(RouteSettings routeSettings) {
    return MaterialPageRoute(
      builder: (_) => const AuthScreen(),
    );
  }

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: BlocListener<LoginBloc, LoginState>(
        listener: (context, state) {},
        child: Center(
          child: ElevatedButton(
            onPressed: () {
              Helper.showSnackBar(context, 'Hey there');
            },
            child: Text('Login'),
          ),
        ),
      ),
    );
  }
}

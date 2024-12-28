part of 'authentication_bloc.dart';

sealed class AuthenticationState extends Equatable {
  const AuthenticationState();
}

final class AuthenticationInitial extends AuthenticationState {
  @override
  List<Object> get props => [];
}

final class Authenticated extends AuthenticationState {
  final String jwtToken;
  final UserEntity? user;

  const Authenticated({required this.jwtToken, required this.user});

  @override
  List<Object?> get props => [user, jwtToken];
}

final class Unauthenticated extends AuthenticationState {
  @override
  List<Object> get props => [];
}

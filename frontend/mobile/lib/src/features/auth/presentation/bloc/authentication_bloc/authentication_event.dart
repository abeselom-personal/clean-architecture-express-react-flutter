part of 'authentication_bloc.dart';

sealed class AuthenticationEvent extends Equatable {
  const AuthenticationEvent();
}

final class CheckAuthentication extends AuthenticationEvent {
  final UserEntity? user;

  const CheckAuthentication({this.user});
  @override
  List<Object> get props => [];
}

final class AuthenticateUser extends AuthenticationEvent {
  final UserEntity user;
  final String jwtToken;

  const AuthenticateUser({required this.user, required this.jwtToken});
  @override
  List<Object> get props => [user, jwtToken];
}

final class Logout extends AuthenticationEvent {
  @override
  List<Object> get props => [];
}

final class TokenExpired extends AuthenticationEvent {
  @override
  List<Object> get props => [];
}
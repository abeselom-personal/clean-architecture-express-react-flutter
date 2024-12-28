import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';

import '../../../domain/entities/user_entity.dart';
import '../../../domain/usecases/cache_token_usecase.dart';
import '../../../domain/usecases/fetch_token_usecase.dart';

part 'authentication_event.dart';

part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  final FetchTokenUseCase fetchTokenUseCase;
  final CacheTokenUseCase cacheTokenUseCase;

  AuthenticationBloc(this.fetchTokenUseCase, this.cacheTokenUseCase)
      : super(AuthenticationInitial()) {
    on<CheckAuthentication>(checkAuthentication);
    on<AuthenticateUser>(authenticateUser);
    on<Logout>(logout);
  }

  Future<void> checkAuthentication(
    CheckAuthentication event,
    Emitter<AuthenticationState> emit,
  ) async {
    final result = await fetchTokenUseCase.call(null);

    result.fold(
      (failure) => emit(Unauthenticated()),
      (jwtToken) {
        if (jwtToken != null) {
          emit(Authenticated(jwtToken: jwtToken, user: event.user));
        } else {
          emit(Unauthenticated());
        }
      },
    );
  }

  Future<void> authenticateUser(
    AuthenticateUser event,
    Emitter<AuthenticationState> emit,
  ) async {
    final result = await cacheTokenUseCase.call(event.jwtToken);

    emit(Authenticated(jwtToken: event.jwtToken, user: event.user));
  }

  Future<void> logout(
    Logout event,
    Emitter<AuthenticationState> emit,
  ) async {
    final result = await cacheTokenUseCase.call(null);

    result.fold(
      (failure) => null,
      (_) {
        emit(Unauthenticated());
      },
    );
  }

  String? getJwtToken() {
    if (state is Authenticated) {
      return (state as Authenticated).jwtToken;
    }
    return null;
  }

  UserEntity? getUserDetails() {
    if (state is Authenticated) {
      return (state as Authenticated).user;
    }
    return null;
  }
}

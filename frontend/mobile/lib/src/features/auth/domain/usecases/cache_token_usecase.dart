import 'package:dartz/dartz.dart';

import '../../../../core/network/errors/failures.dart';
import '../../../../core/usecase/usecase.dart';
import '../repositories/abstract_auth_repository.dart';

class CacheTokenUseCase extends UseCase<void, String> {
  final AbstractAuthRepository authRepository;

  CacheTokenUseCase(this.authRepository);

  @override
  Future<Either<Failure, void>> call(String? params) async {
    final result = await authRepository.cacheJwtToken(params!);

    return result.fold(
      (l) => Left(l),
      (_) => Right(null),
    );
  }
}

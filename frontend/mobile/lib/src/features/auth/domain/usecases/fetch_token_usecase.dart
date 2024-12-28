import 'package:dartz/dartz.dart';

import '../../../../core/network/errors/failures.dart';
import '../../../../core/usecase/usecase.dart';
import '../repositories/abstract_auth_repository.dart';

class FetchTokenUseCase extends UseCase<String?, NoParams> {
  final AbstractAuthRepository authRepository;

  FetchTokenUseCase(this.authRepository);

  @override
  Future<Either<Failure, String?>> call(NoParams? params) async {
    final result = await authRepository.fetchJwtToken();

    return result.fold(
      (l) => Left(l),
      (r) => Right(r),
    );
  }
}

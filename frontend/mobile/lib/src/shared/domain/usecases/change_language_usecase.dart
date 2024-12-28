import 'package:dartz/dartz.dart';

import '../../../core/network/errors/failures.dart';
import '../../../core/usecase/usecase.dart';
import '../repositories/abstract_settings_repository.dart';

class ChangeLanguageUseCase extends UseCase<void, String> {
  final AbstractSettingsRepository _repository;

  ChangeLanguageUseCase(this._repository);

  @override
  Future<Either<Failure, void>> call(String? params) async {
    final result = await _repository.changeLanguage(params!);
    return result.fold(
      (l) => Left(l),
      (r) => Right(r),
    );
  }
}
